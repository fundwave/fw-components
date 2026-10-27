import type { Row } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import React from "react";
import type { CellEditType, EditCellRenderProps, SelectOption } from "../../types";
import { CellEditor } from "./CellEditor";

export interface EditableCellProps<TData = unknown> {
  isEditing: boolean;
  displayValue: React.ReactNode;
  rawValue: unknown;
  row: Row<TData>;
  rowId: string;
  columnId: string;
  /** Human-readable column label, used as the editor's accessible name */
  columnLabel?: string;
  editable: boolean;
  editType?: CellEditType;
  editOptions?: SelectOption[];
  customEditCell?: (props: EditCellRenderProps<TData>) => React.ReactNode;
  onStartEdit: (rowId: string, columnId: string, currentValue: unknown) => void;
  onUpdateDraft: (rowId: string, columnId: string, value: unknown) => void;
  onCommit: (rowId: string, columnId: string) => void;
  onCancel: () => void;
  draftValue?: unknown;
  error?: string | null;
  commitOnBlur?: boolean;
}

export const EditableCell = <TData,>({
  isEditing,
  displayValue,
  rawValue,
  row,
  rowId,
  columnId,
  columnLabel,
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
  commitOnBlur = true,
}: EditableCellProps<TData>) => {
  if (!editable) {
    return <>{displayValue}</>;
  }

  // Only fall back to rawValue when there's no draft — a draft of `null` (a cleared
  // field) is a real value, not missing.
  const effectiveValue = draftValue !== undefined ? draftValue : rawValue;

  if (isEditing) {
    if (customEditCell) {
      return (
        <>
          {customEditCell({
            value: effectiveValue,
            row,
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
        value={effectiveValue}
        options={editOptions}
        onChange={(v) => onUpdateDraft(rowId, columnId, v)}
        onCommit={() => onCommit(rowId, columnId)}
        onCancel={onCancel}
        error={error}
        commitOnBlur={commitOnBlur}
        label={columnLabel || columnId}
      />
    );
  }

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
      <Pencil className="w-3 h-3 text-gray-300 group-hover:text-blue-400 flex-shrink-0 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};
