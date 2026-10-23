import { useCallback, useRef, useState } from "react";
import type { BulkEditEvent } from "../types";

interface UseBulkEditOptions<TData> {
  /** Called when bulk edit is committed */
  onBulkEdit?: (event: BulkEditEvent<TData>) => void | Promise<void>;
  /** Validate a value before applying to all selected rows */
  validateBulkEdit?: (value: unknown, columnId: string) => string | null | Promise<string | null>;
}

interface BulkEditState {
  /** Whether bulk edit mode is active */
  isActive: boolean;
  /** The column being bulk edited */
  columnId: string | null;
  /** The value to apply to all selected rows */
  value: unknown;
  /** Validation error */
  error: string | null;
  /** Whether save is in progress */
  isSaving: boolean;
}

interface UseBulkEditReturn<TData> {
  /** Current bulk edit state */
  bulkEditState: BulkEditState;
  /** Start bulk editing a column for selected rows */
  startBulkEdit: (columnId: string) => void;
  /** Update the bulk edit value */
  updateBulkValue: (value: unknown) => void;
  /**
   * Commit the bulk edit to all selected rows. Pass `override` to commit a column/value
   * atomically in the same call — relying on state set via `startBulkEdit`/`updateBulkValue`
   * right before calling this reads stale (pre-render) state, since React hasn't
   * re-rendered yet when they're called back-to-back.
   */
  commitBulkEdit: (
    selectedRowIds: string[],
    rows: TData[],
    override?: { columnId: string; value: unknown }
  ) => Promise<boolean>;
  /** Cancel bulk editing */
  cancelBulkEdit: () => void;
  /** Whether bulk edit is active */
  isBulkEditing: boolean;
}

/**
 * Hook for managing bulk (multi-row) editing operations.
 * Designed for the use case of selecting multiple assets and updating
 * a field value across all of them at once.
 */
export function useBulkEdit<TData = unknown>(
  options: UseBulkEditOptions<TData> = {}
): UseBulkEditReturn<TData> {
  const { onBulkEdit, validateBulkEdit } = options;

  const [bulkEditState, setBulkEditState] = useState<BulkEditState>({
    isActive: false,
    columnId: null,
    value: undefined,
    error: null,
    isSaving: false,
  });

  // Bumped on every new commit attempt and whenever the session is explicitly
  // superseded (start/cancel), so an older in-flight save can tell it's stale before
  // applying its result and clobbering a newer session's state.
  const sessionRef = useRef(0);

  const startBulkEdit = useCallback((columnId: string) => {
    sessionRef.current += 1;
    setBulkEditState({
      isActive: true,
      columnId,
      value: undefined,
      error: null,
      isSaving: false,
    });
  }, []);

  const updateBulkValue = useCallback((value: unknown) => {
    setBulkEditState((prev) => ({
      ...prev,
      value,
      error: null,
    }));
  }, []);

  const commitBulkEdit = useCallback(
    async (
      selectedRowIds: string[],
      rows: TData[],
      override?: { columnId: string; value: unknown }
    ): Promise<boolean> => {
      const columnId = override?.columnId ?? bulkEditState.columnId;
      const value = override ? override.value : bulkEditState.value;
      if (!columnId || selectedRowIds.length === 0) return false;

      const version = ++sessionRef.current;

      // Validate
      if (validateBulkEdit) {
        let error: string | null;
        try {
          error = await validateBulkEdit(value, columnId);
        } catch {
          error = "Validation failed";
        }
        // A newer session (another commit, or start/cancel) has superseded this one —
        // don't let a late validation result touch state it no longer owns.
        if (sessionRef.current !== version) return false;
        if (error) {
          setBulkEditState((prev) => ({ ...prev, error }));
          return false;
        }
      }

      setBulkEditState((prev) => (sessionRef.current === version ? { ...prev, isSaving: true } : prev));

      try {
        await onBulkEdit?.({
          rowIds: selectedRowIds,
          columnId,
          value,
          rows,
        });

        if (sessionRef.current !== version) return true;

        setBulkEditState({
          isActive: false,
          columnId: null,
          value: undefined,
          error: null,
          isSaving: false,
        });

        return true;
      } catch {
        if (sessionRef.current !== version) return false;
        setBulkEditState((prev) => ({
          ...prev,
          error: "Failed to save bulk edit",
          isSaving: false,
        }));
        return false;
      }
    },
    [bulkEditState, onBulkEdit, validateBulkEdit]
  );

  const cancelBulkEdit = useCallback(() => {
    sessionRef.current += 1;
    setBulkEditState({
      isActive: false,
      columnId: null,
      value: undefined,
      error: null,
      isSaving: false,
    });
  }, []);

  return {
    bulkEditState,
    startBulkEdit,
    updateBulkValue,
    commitBulkEdit,
    cancelBulkEdit,
    isBulkEditing: bulkEditState.isActive,
  };
}
