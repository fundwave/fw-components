import { useCallback, useState } from "react";
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
  /** Commit the bulk edit to all selected rows */
  commitBulkEdit: (selectedRowIds: string[], rows: TData[]) => Promise<boolean>;
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

  const startBulkEdit = useCallback((columnId: string) => {
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
    async (selectedRowIds: string[], rows: TData[]): Promise<boolean> => {
      const { columnId, value } = bulkEditState;
      if (!columnId || selectedRowIds.length === 0) return false;

      // Validate
      if (validateBulkEdit) {
        const error = await validateBulkEdit(value, columnId);
        if (error) {
          setBulkEditState((prev) => ({ ...prev, error }));
          return false;
        }
      }

      setBulkEditState((prev) => ({ ...prev, isSaving: true }));

      try {
        await onBulkEdit?.({
          rowIds: selectedRowIds,
          columnId,
          value,
          rows,
        });

        setBulkEditState({
          isActive: false,
          columnId: null,
          value: undefined,
          error: null,
          isSaving: false,
        });

        return true;
      } catch {
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
