import type { Row } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import React from "react";
import type { CellEditType, EditCellRenderProps, EditingHandlers, SelectOption } from "../../types";
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
  draftValue?: unknown;
  error?: string | null;
  editing: EditingHandlers;
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
  draftValue,
  error,
  editing,
}: EditableCellProps<TData>) => {
  const { onStartEdit, onUpdateDraft, onCommitEdit, onCancelEdit, commitOnBlur = true } = editing;
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
            onCommit: () => onCommitEdit(rowId, columnId),
            onCancel: onCancelEdit,
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
        onCommit={() => onCommitEdit(rowId, columnId)}
        onCancel={onCancelEdit}
        error={error}
        commitOnBlur={commitOnBlur}
        label={columnLabel || columnId}
      />
    );
  }

  return (
    <div
      className="fwgrid:cursor-pointer fwgrid:hover:bg-blue-50/60 fwgrid:rounded fwgrid:px-1 -fwgrid:mx-1 fwgrid:min-h-[1.5rem] fwgrid:flex fwgrid:items-center fwgrid:w-full fwgrid:group"
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
      <span className="fwgrid:flex-1 fwgrid:truncate">{displayValue || <span className="fwgrid:text-gray-400">—</span>}</span>
      <Pencil className="fwgrid:w-3 fwgrid:h-3 fwgrid:text-gray-300 fwgrid:group-hover:text-blue-400 fwgrid:flex-shrink-0 fwgrid:ml-1 fwgrid:opacity-0 fwgrid:group-hover:opacity-100 fwgrid:transition-opacity" />
    </div>
  );
};
