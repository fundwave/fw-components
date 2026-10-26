import { useCallback, useRef, useState } from "react";
import type { BulkEditEvent } from "../types";

interface UseBulkEditOptions<TData> {
  onBulkEdit?: (event: BulkEditEvent<TData>) => void | Promise<void>;
  validateBulkEdit?: (value: unknown, columnId: string) => string | null | Promise<string | null>;
}

interface BulkEditState {
  isActive: boolean;
  columnId: string | null;
  value: unknown;
  error: string | null;
  isSaving: boolean;
}

interface UseBulkEditReturn<TData> {
  bulkEditState: BulkEditState;
  startBulkEdit: (columnId: string) => void;
  updateBulkValue: (value: unknown) => void;
  /**
   * Pass `override` to commit atomically in the same call — state set via
   * `startBulkEdit`/`updateBulkValue` just before is still stale pre-render.
   */
  commitBulkEdit: (
    selectedRowIds: string[],
    rows: TData[],
    override?: { columnId: string; value: unknown }
  ) => Promise<boolean>;
  cancelBulkEdit: () => void;
  isBulkEditing: boolean;
}

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

  // Bumped on every commit attempt and on start/cancel, so an older in-flight save can
  // tell it's stale before clobbering newer state.
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

      if (validateBulkEdit) {
        let error: string | null;
        try {
          error = await validateBulkEdit(value, columnId);
        } catch {
          error = "Validation failed";
        }
        // A newer session has superseded this one — don't let a late validation result
        // touch state it no longer owns.
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
