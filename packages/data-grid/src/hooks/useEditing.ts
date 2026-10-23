import { useCallback, useEffect, useRef, useState } from "react";
import type { EditingState } from "../types";

interface UseEditingOptions {
  /** Called when a cell edit is committed */
  onCellEdit?: (rowId: string, columnId: string, value: unknown, previousValue: unknown) => void | Promise<void>;
  /** Validate before committing */
  validateCell?: (value: unknown, rowId: string, columnId: string) => string | null | Promise<string | null>;
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
  const { onCellEdit, validateCell } = options;

  const [editingState, setEditingState] = useState<EditingState>({
    editingCell: null,
    drafts: {},
    errors: {},
    dirtyCells: new Set(),
  });

  // Store the original values for dirty comparison
  const originalValues = useRef<Record<string, unknown>>({});

  // Mirrors `editingState` synchronously (updated inside the setState updater itself,
  // not just after render) so a commit that runs immediately after updateDraft/startEditing
  // in the same tick always reads the latest draft instead of a stale pre-render value.
  const editingStateRef = useRef(editingState);

  // Per-cell edit-session counter. An in-flight async commit captures the version for its
  // cell at the start; if a newer session for that same cell has begun by the time it
  // resolves (the user reopened it, or started editing another cell), the commit's
  // completion must not clobber the newer session's draft/editingCell state.
  const sessionVersion = useRef<Record<string, number>>({});

  // In-flight commit per cell. Enter followed by a blur on the still-mounted editor (or
  // select's auto-commit overlapping a blur) can call commitEdit twice for the same draft
  // before the first resolves — return the same promise instead of firing a second save.
  const pendingCommits = useRef<Record<string, Promise<boolean>>>({});

  const startEditing = useCallback((rowId: string, columnId: string, currentValue: unknown) => {
    const key = cellKey(rowId, columnId);
    originalValues.current[key] = currentValue;
    sessionVersion.current[key] = (sessionVersion.current[key] ?? 0) + 1;

    setEditingState((prev) => {
      const next: EditingState = {
        ...prev,
        editingCell: { rowId, columnId },
        drafts: { ...prev.drafts, [key]: currentValue },
        errors: { ...prev.errors, [key]: "" },
      };
      editingStateRef.current = next;
      return next;
    });
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

      const next: EditingState = {
        ...prev,
        drafts: { ...prev.drafts, [key]: value },
        dirtyCells: newDirtyCells,
        errors: { ...prev.errors, [key]: "" },
      };
      // Sync the ref immediately so a commit called right after this (e.g. the
      // `onChange(newValue); onCommit();` pattern) reads the new draft instead of a
      // stale pre-render value.
      editingStateRef.current = next;
      return next;
    });
  }, []);

  const commitEdit = useCallback(
    (rowId: string, columnId: string): Promise<boolean> => {
      const key = cellKey(rowId, columnId);

      const pending = pendingCommits.current[key];
      if (pending) return pending;

      const promise = (async (): Promise<boolean> => {
        const version = sessionVersion.current[key] ?? 0;

        const draftValue = editingStateRef.current.drafts[key];
        const previousValue = originalValues.current[key];

        // Skip if unchanged
        if (draftValue === previousValue) {
          setEditingState((prev) => {
            if (prev.editingCell?.rowId !== rowId || prev.editingCell?.columnId !== columnId) return prev;
            const next: EditingState = { ...prev, editingCell: null };
            editingStateRef.current = next;
            return next;
          });
          return true;
        }

        // Validate
        if (validateCell) {
          let error: string | null;
          try {
            error = await validateCell(draftValue, rowId, columnId);
          } catch {
            error = "Validation failed";
          }
          // A newer session for this cell started while validation was in flight — bail out
          // without touching state that no longer belongs to this commit.
          if (sessionVersion.current[key] !== version) return false;
          if (error) {
            setEditingState((prev) => {
              const next: EditingState = { ...prev, errors: { ...prev.errors, [key]: error } };
              editingStateRef.current = next;
              return next;
            });
            return false;
          }
        }

        // Commit
        try {
          await onCellEdit?.(rowId, columnId, draftValue, previousValue);

          if (sessionVersion.current[key] !== version) return true;

          // Clear editing state for this cell
          setEditingState((prev) => {
            const newDrafts = { ...prev.drafts };
            delete newDrafts[key];
            const newErrors = { ...prev.errors };
            delete newErrors[key];
            const newDirtyCells = new Set(prev.dirtyCells);
            newDirtyCells.delete(key);
            delete originalValues.current[key];

            const next: EditingState = {
              ...prev,
              // Only close the editor if this cell is still the active one — an older
              // commit resolving after the user moved to another cell must not close it.
              editingCell:
                prev.editingCell?.rowId === rowId && prev.editingCell?.columnId === columnId
                  ? null
                  : prev.editingCell,
              drafts: newDrafts,
              errors: newErrors,
              dirtyCells: newDirtyCells,
            };
            editingStateRef.current = next;
            return next;
          });

          return true;
        } catch {
          if (sessionVersion.current[key] !== version) return false;
          setEditingState((prev) => {
            const next: EditingState = { ...prev, errors: { ...prev.errors, [key]: "Failed to save" } };
            editingStateRef.current = next;
            return next;
          });
          return false;
        }
      })();

      pendingCommits.current[key] = promise;
      promise.finally(() => {
        if (pendingCommits.current[key] === promise) delete pendingCommits.current[key];
      });
      return promise;
    },
    [onCellEdit, validateCell]
  );

  const cancelEdit = useCallback(() => {
    const editingCell = editingStateRef.current.editingCell;
    if (editingCell) {
      const key = cellKey(editingCell.rowId, editingCell.columnId);
      // Invalidate any in-flight commit for this cell so it can't resurrect the
      // cancelled draft after the fact.
      sessionVersion.current[key] = (sessionVersion.current[key] ?? 0) + 1;
      setEditingState((prev) => {
        const newDrafts = { ...prev.drafts };
        delete newDrafts[key];
        const newErrors = { ...prev.errors };
        delete newErrors[key];
        const newDirtyCells = new Set(prev.dirtyCells);
        newDirtyCells.delete(key);
        delete originalValues.current[key];

        const next: EditingState = {
          ...prev,
          editingCell: null,
          drafts: newDrafts,
          errors: newErrors,
          dirtyCells: newDirtyCells,
        };
        editingStateRef.current = next;
        return next;
      });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && editingStateRef.current.editingCell) {
        cancelEdit();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [cancelEdit]);

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
    sessionVersion.current = {};
    const next: EditingState = {
      editingCell: null,
      drafts: {},
      errors: {},
      dirtyCells: new Set(),
    };
    editingStateRef.current = next;
    setEditingState(next);
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
