import { useCallback, useRef, useState } from "react";
import type { EditingState } from "../types";

interface UseEditingOptions {
  /** Called when a cell edit is committed */
  onCellEdit?: (rowId: string, columnId: string, value: unknown, previousValue: unknown) => void | Promise<void>;
  /** Validate before committing */
  validateCell?: (value: unknown, rowId: string, columnId: string) => string | null | Promise<string | null>;
  /** Whether to commit the edit on blur */
  commitOnBlur?: boolean;
}

interface UseEditingReturn {
  /** Current editing state */
  editingState: EditingState;
  /** Start editing a specific cell */
  startEditing: (rowId: string, columnId: string, currentValue: unknown) => void;
  /** Update the draft value for the currently editing cell */
  updateDraft: (rowId: string, columnId: string, value: unknown) => void;
  /** Commit the current edit */
  commitEdit: (rowId: string, columnId: string) => Promise<boolean>;
  /** Cancel the current edit */
  cancelEdit: () => void;
  /** Check if a cell is currently being edited */
  isEditing: (rowId: string, columnId: string) => boolean;
  /** Get the draft value for a cell */
  getDraft: (rowId: string, columnId: string) => unknown | undefined;
  /** Get validation error for a cell */
  getError: (rowId: string, columnId: string) => string | undefined;
  /** Check if a cell has uncommitted changes */
  isDirty: (rowId: string, columnId: string) => boolean;
  /** Clear all editing state */
  reset: () => void;
}

const cellKey = (rowId: string, columnId: string) => `${rowId}:${columnId}`;

/**
 * Hook for managing cell editing state.
 * Stores draft values independently of the cell component lifecycle,
 * so virtualized rows can unmount without losing edits.
 */
export function useEditing(options: UseEditingOptions = {}): UseEditingReturn {
  const { onCellEdit, validateCell, commitOnBlur: _commitOnBlur } = options;

  const [editingState, setEditingState] = useState<EditingState>({
    editingCell: null,
    drafts: {},
    errors: {},
    dirtyCells: new Set(),
  });

  // Store the original values for dirty comparison
  const originalValues = useRef<Record<string, unknown>>({});

  const startEditing = useCallback((rowId: string, columnId: string, currentValue: unknown) => {
    const key = cellKey(rowId, columnId);
    originalValues.current[key] = currentValue;

    setEditingState((prev) => ({
      ...prev,
      editingCell: { rowId, columnId },
      drafts: { ...prev.drafts, [key]: currentValue },
      errors: { ...prev.errors, [key]: "" },
    }));
  }, []);

  const updateDraft = useCallback((rowId: string, columnId: string, value: unknown) => {
    const key = cellKey(rowId, columnId);
    setEditingState((prev) => {
      const newDirtyCells = new Set(prev.dirtyCells);
      if (value !== originalValues.current[key]) {
        newDirtyCells.add(key);
      } else {
        newDirtyCells.delete(key);
      }

      return {
        ...prev,
        drafts: { ...prev.drafts, [key]: value },
        dirtyCells: newDirtyCells,
        errors: { ...prev.errors, [key]: "" },
      };
    });
  }, []);

  const commitEdit = useCallback(
    async (rowId: string, columnId: string): Promise<boolean> => {
      const key = cellKey(rowId, columnId);

      const draftValue = editingState.drafts[key];
      const previousValue = originalValues.current[key];

      // Skip if unchanged
      if (draftValue === previousValue) {
        setEditingState((prev) => ({
          ...prev,
          editingCell: null,
        }));
        return true;
      }

      // Validate
      if (validateCell) {
        const error = await validateCell(draftValue, rowId, columnId);
        if (error) {
          setEditingState((prev) => ({
            ...prev,
            errors: { ...prev.errors, [key]: error },
          }));
          return false;
        }
      }

      // Commit
      try {
        await onCellEdit?.(rowId, columnId, draftValue, previousValue);

        // Clear editing state for this cell
        setEditingState((prev) => {
          const newDrafts = { ...prev.drafts };
          delete newDrafts[key];
          const newErrors = { ...prev.errors };
          delete newErrors[key];
          const newDirtyCells = new Set(prev.dirtyCells);
          newDirtyCells.delete(key);
          delete originalValues.current[key];

          return {
            ...prev,
            editingCell: null,
            drafts: newDrafts,
            errors: newErrors,
            dirtyCells: newDirtyCells,
          };
        });

        return true;
      } catch {
        setEditingState((prev) => ({
          ...prev,
          errors: { ...prev.errors, [key]: "Failed to save" },
        }));
        return false;
      }
    },
    [editingState.drafts, onCellEdit, validateCell]
  );

  const cancelEdit = useCallback(() => {
    if (editingState.editingCell) {
      const key = cellKey(editingState.editingCell.rowId, editingState.editingCell.columnId);
      setEditingState((prev) => {
        const newDrafts = { ...prev.drafts };
        delete newDrafts[key];
        const newErrors = { ...prev.errors };
        delete newErrors[key];
        const newDirtyCells = new Set(prev.dirtyCells);
        newDirtyCells.delete(key);
        delete originalValues.current[key];

        return {
          ...prev,
          editingCell: null,
          drafts: newDrafts,
          errors: newErrors,
          dirtyCells: newDirtyCells,
        };
      });
    }
  }, [editingState.editingCell]);

  const isEditing = useCallback(
    (rowId: string, columnId: string) => {
      return (
        editingState.editingCell?.rowId === rowId &&
        editingState.editingCell?.columnId === columnId
      );
    },
    [editingState.editingCell]
  );

  const getDraft = useCallback(
    (rowId: string, columnId: string) => {
      return editingState.drafts[cellKey(rowId, columnId)];
    },
    [editingState.drafts]
  );

  const getError = useCallback(
    (rowId: string, columnId: string) => {
      return editingState.errors[cellKey(rowId, columnId)] || undefined;
    },
    [editingState.errors]
  );

  const isDirty = useCallback(
    (rowId: string, columnId: string) => {
      return editingState.dirtyCells.has(cellKey(rowId, columnId));
    },
    [editingState.dirtyCells]
  );

  const reset = useCallback(() => {
    originalValues.current = {};
    setEditingState({
      editingCell: null,
      drafts: {},
      errors: {},
      dirtyCells: new Set(),
    });
  }, []);

  return {
    editingState,
    startEditing,
    updateDraft,
    commitEdit,
    cancelEdit,
    isEditing,
    getDraft,
    getError,
    isDirty,
    reset,
  };
}
