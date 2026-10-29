import { useCallback, useEffect, useRef, useState } from "react";
import type { EditingState } from "../types";

interface UseEditingOptions {
  onCellEdit?: (rowId: string, columnId: string, value: unknown, previousValue: unknown) => void | Promise<void>;
  validateCell?: (value: unknown, rowId: string, columnId: string) => string | null | Promise<string | null>;
}

interface UseEditingReturn {
  editingState: EditingState;
  startEditing: (rowId: string, columnId: string, currentValue: unknown) => void;
  updateDraft: (rowId: string, columnId: string, value: unknown) => void;
  commitEdit: (rowId: string, columnId: string) => Promise<boolean>;
  cancelEdit: () => void;
  isEditing: (rowId: string, columnId: string) => boolean;
  getDraft: (rowId: string, columnId: string) => unknown | undefined;
  getError: (rowId: string, columnId: string) => string | undefined;
  isDirty: (rowId: string, columnId: string) => boolean;
  reset: () => void;
}

const cellKey = (rowId: string, columnId: string) => `${rowId}:${columnId}`;

/**
 * Stores drafts outside the cell lifecycle so virtualized rows can unmount without
 * losing edits.
 */
export function useEditing(options: UseEditingOptions = {}): UseEditingReturn {
  const { onCellEdit, validateCell } = options;

  const [editingState, setEditingState] = useState<EditingState>({
    editingCell: null,
    drafts: {},
    errors: {},
    dirtyCells: new Set(),
  });

  const originalValues = useRef<Record<string, unknown>>({});

  // Mirrors `editingState` synchronously (set inside the updater itself) so a same-tick
  // commit after updateDraft/startEditing reads the latest draft, not a stale one.
  const editingStateRef = useRef(editingState);

  // Per-cell session counter — an in-flight commit captures its version at start, and
  // must not clobber a newer session's state if one began before it resolves.
  const sessionVersion = useRef<Record<string, number>>({});

  // In-flight commit per cell, tagged by session and draft revision — dedupes a repeated
  // call for the same draft but still saves a newer one.
  const pendingCommits = useRef<Record<string, { version: number; revision: number; promise: Promise<boolean> }>>({});

  // Bumped on every updateDraft so a commit can tell if a pending one covers an earlier draft.
  const draftRevision = useRef<Record<string, number>>({});

  const startEditing = useCallback((rowId: string, columnId: string, currentValue: unknown) => {
    const key = cellKey(rowId, columnId);
    originalValues.current[key] = currentValue;
    sessionVersion.current[key] = (sessionVersion.current[key] ?? 0) + 1;
    draftRevision.current[key] = 0;

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
    draftRevision.current[key] = (draftRevision.current[key] ?? 0) + 1;
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
      // Syncs the ref immediately so a commit called right after (`onChange(v);
      // onCommit();`) reads the new draft, not a stale one.
      editingStateRef.current = next;
      return next;
    });
  }, []);

  const commitEdit = useCallback(
    (rowId: string, columnId: string): Promise<boolean> => {
      const key = cellKey(rowId, columnId);
      const version = sessionVersion.current[key] ?? 0;
      const revision = draftRevision.current[key] ?? 0;

      // Only dedupe against a pending commit from the same session — an older one
      // belongs to a draft that no longer exists.
      const pending = pendingCommits.current[key];
      if (pending && pending.version === version) {
        if (pending.revision === revision) {
          // Exact duplicate of the in-flight commit (same draft) — reuse it.
          return pending.promise;
        }
        // Draft changed since dispatch — queue a fresh commit instead of losing it.
        const queued = pending.promise.then(() => commitEdit(rowId, columnId));
        pendingCommits.current[key] = { version, revision, promise: queued };
        return queued;
      }

      const promise = (async (): Promise<boolean> => {
        const draftValue = editingStateRef.current.drafts[key];
        const previousValue = originalValues.current[key];

        if (draftValue === previousValue) {
          setEditingState((prev) => {
            if (prev.editingCell?.rowId !== rowId || prev.editingCell?.columnId !== columnId) return prev;
            const next: EditingState = { ...prev, editingCell: null };
            editingStateRef.current = next;
            return next;
          });
          return true;
        }

        if (validateCell) {
          let error: string | null;
          try {
            error = await validateCell(draftValue, rowId, columnId);
          } catch {
            error = "Validation failed";
          }
          // Bail out if a newer session started while validation was in flight — this
          // commit no longer owns the state.
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

        try {
          await onCellEdit?.(rowId, columnId, draftValue, previousValue);

          if (sessionVersion.current[key] !== version) return true;

          setEditingState((prev) => {
            const newDrafts = { ...prev.drafts };
            delete newDrafts[key];
            const newErrors = { ...prev.errors };
            delete newErrors[key];
            const newDirtyCells = new Set(prev.dirtyCells);
            newDirtyCells.delete(key);
            delete originalValues.current[key];
            delete draftRevision.current[key];

            const next: EditingState = {
              ...prev,
              // Only close the editor if this cell is still active — an older commit
              // resolving later must not close a different one.
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

      pendingCommits.current[key] = { version, revision, promise };
      promise.finally(() => {
        // Only clear if it's still ours — a newer session's commit may have already
        // replaced it.
        if (pendingCommits.current[key]?.promise === promise) delete pendingCommits.current[key];
      });
      return promise;
    },
    [onCellEdit, validateCell]
  );

  const cancelEdit = useCallback(() => {
    const editingCell = editingStateRef.current.editingCell;
    if (editingCell) {
      const key = cellKey(editingCell.rowId, editingCell.columnId);
      // Invalidates any in-flight commit so it can't resurrect the cancelled draft later.
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
    // Bump instead of clearing — clearing would let a later edit reuse version 1 and
    // match a stale pending commit.
    for (const key of Object.keys(sessionVersion.current)) {
      sessionVersion.current[key] += 1;
    }
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
