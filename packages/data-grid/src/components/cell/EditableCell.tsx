import React from "react";
import type { CellEditType, EditCellRenderProps, SelectOption } from "../../types";
import { CellEditor } from "./CellEditor";

// ============================================================================
// EDITABLE CELL WRAPPER
// ============================================================================

export interface EditableCellProps<TData = unknown> {
  /** Whether this cell is currently in edit mode */
  isEditing: boolean;
  /** The current display value */
  displayValue: React.ReactNode;
  /** The raw cell value for editing */
  rawValue: unknown;
  /** Row object */
  row: TData;
  /** Row ID */
  rowId: string;
  /** Column ID */
  columnId: string;
  /** Whether the column is editable */
  editable: boolean;
  /** Editor type */
  editType?: CellEditType;
  /** Options for select editor */
  editOptions?: SelectOption[];
  /** Custom edit cell renderer */
  customEditCell?: (props: EditCellRenderProps<TData>) => React.ReactNode;
  /** Start editing this cell */
  onStartEdit: (rowId: string, columnId: string, currentValue: unknown) => void;
  /** Update draft value */
  onUpdateDraft: (rowId: string, columnId: string, value: unknown) => void;
  /** Commit the edit */
  onCommit: (rowId: string, columnId: string) => void;
  /** Cancel the edit */
  onCancel: () => void;
  /** Draft value */
  draftValue?: unknown;
  /** Validation error */
  error?: string | null;
}

/**
 * Wraps cell content with editing capabilities.
 * In read mode: shows formatted content with click-to-edit hint.
 * In edit mode: shows the appropriate editor.
 */
export const EditableCell = <TData,>({
  isEditing,
  displayValue,
  rawValue,
  row,
  rowId,
  columnId,
  editable,
  editType = "text",
  editOptions,
  customEditCell,
  onStartEdit,
  onUpdateDraft,
  onCommit,
  onCancel,
  draftValue,
  error,
}: EditableCellProps<TData>) => {
  if (!editable) {
    return <>{displayValue}</>;
  }

  if (isEditing) {
    // Custom edit renderer takes priority
    if (customEditCell) {
      return (
        <>
          {customEditCell({
            value: draftValue ?? rawValue,
            row: row as unknown as import("@tanstack/react-table").Row<TData>,
            columnId,
            onChange: (v) => onUpdateDraft(rowId, columnId, v),
            onCommit: () => onCommit(rowId, columnId),
            onCancel,
            error,
          })}
        </>
      );
    }

    return (
      <CellEditor
        type={editType === "custom" ? "text" : editType}
        value={draftValue ?? rawValue}
        options={editOptions}
        onChange={(v) => onUpdateDraft(rowId, columnId, v)}
        onCommit={() => onCommit(rowId, columnId)}
        onCancel={onCancel}
        error={error}
      />
    );
  }

  // Read mode: show display value with subtle edit affordance
  return (
    <div
      className="cursor-pointer hover:bg-blue-50/60 rounded px-1 -mx-1 min-h-[1.5rem] flex items-center w-full group"
      onClick={(e) => {
        e.stopPropagation();
        onStartEdit(rowId, columnId, rawValue);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "F2") {
          e.preventDefault();
          e.stopPropagation();
          onStartEdit(rowId, columnId, rawValue);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Edit ${columnId}`}
    >
      <span className="flex-1 truncate">{displayValue || <span className="text-gray-400">—</span>}</span>
      <svg
        className="w-3 h-3 text-gray-300 group-hover:text-blue-400 flex-shrink-0 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    </div>
  );
};
