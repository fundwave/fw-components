import type { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import React, { type ReactNode } from "react";
import type { DataGridFeatures, OnInteractionCallback } from "../../types";
import { formatAndTrimValue } from "../../utils/formatting";
import { cn, getAlignmentClasses, getColumnPinningStyles, getNestedRowPadding } from "../../utils/styling";
import { EditableCell } from "../cell/EditableCell";
import { ExpandToggle } from "../commons/ExpandToggle";

export interface DataRowProps<TData> {
  row: Row<TData>;
  features?: DataGridFeatures;
  getRowClassName?: (row: TData, depth: number) => string;
  onRowClick?: (row: TData) => void;
  renderSubContent?: (row: TData) => ReactNode;
  showExpandToggle?: (row: TData) => boolean;
  dataIndex?: number;
  onInteraction?: OnInteractionCallback;
  // Editing props
  editingEnabled?: boolean;
  isEditingCell?: (rowId: string, columnId: string) => boolean;
  getDraft?: (rowId: string, columnId: string) => unknown | undefined;
  getError?: (rowId: string, columnId: string) => string | undefined;
  onStartEdit?: (rowId: string, columnId: string, currentValue: unknown) => void;
  onUpdateDraft?: (rowId: string, columnId: string, value: unknown) => void;
  onCommitEdit?: (rowId: string, columnId: string) => void;
  onCancelEdit?: () => void;
  // Range selection props
  rangeSelectionEnabled?: boolean;
  onCellMouseDown?: (rowIndex: number, columnIndex: number, event: React.MouseEvent) => void;
  onCellMouseEnter?: (rowIndex: number, columnIndex: number) => void;
  isCellSelected?: (rowIndex: number, columnIndex: number) => boolean;
  isActiveCell?: (rowIndex: number, columnIndex: number) => boolean;
  /** The row's visual index in the displayed list (for range selection) */
  rowVisualIndex?: number;
}

/**
 * A single data row in the grid. Handles:
 * - Nested/hierarchical rendering with expand toggle
 * - Column pinning
 * - Cell formatting
 * - Editable cells
 * - Row click interactions
 */
export const DataRow = <TData,>({
  row,
  features,
  getRowClassName,
  onRowClick,
  renderSubContent,
  showExpandToggle,
  dataIndex,
  onInteraction,
  editingEnabled,
  isEditingCell,
  getDraft,
  getError,
  onStartEdit,
  onUpdateDraft,
  onCommitEdit,
  onCancelEdit,
  rangeSelectionEnabled,
  onCellMouseDown,
  onCellMouseEnter,
  isCellSelected,
  isActiveCell,
  rowVisualIndex,
}: DataRowProps<TData>) => {
  const originalRow = row.original;
  const canExpand = row.getCanExpand();
  const isExpanded = canExpand && row.getIsExpanded();
  const depth = row.depth;
  const shouldShowToggle = showExpandToggle ? showExpandToggle(originalRow) : true;

  const customRowClasses = getRowClassName ? getRowClassName(originalRow, depth) : "";

  const rowClasses = cn(
    "border-b border-gray-100 transition-colors",
    canExpand && "font-semibold",
    onRowClick && "cursor-pointer",
    "bg-white hover:bg-gray-50",
    customRowClasses
  );

  const handleRowClick = (event: React.KeyboardEvent<HTMLTableRowElement> | React.MouseEvent<HTMLTableRowElement>) => {
    if (!onRowClick) return;
    // Don't handle clicks that originated from interactive elements (checkbox, button, input)
    const target = event.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "BUTTON" || target.closest("input, button, [role=\"button\"]")) {
      return;
    }
    const isEnterOrSpace = "key" in event && (event.key === "Enter" || event.key === " ");
    const isMouseClick = "button" in event;
    if (isEnterOrSpace || isMouseClick) {
      onInteraction?.("Clicked Row", { label: String(row.id), type: "rowClick" });
      onRowClick(originalRow);
    }
  };

  const handleExpandToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    row.toggleExpanded();
    onInteraction?.("Toggled Row Expansion", { label: String(row.id), type: "expanding" });
  };

  return (
    <>
      <tr
        className={rowClasses}
        onClick={handleRowClick}
        onKeyDown={handleRowClick}
        role={onRowClick ? "button" : undefined}
        tabIndex={onRowClick ? 0 : undefined}
        data-index={dataIndex}
        data-row-id={row.id}
      >
        {row.getVisibleCells().map((cell, cellIndex) => {
          const column = cell.column;
          const columnDef = column.columnDef;
          const columnMeta = columnDef.meta ?? {};
          const { textAlign, justifyContent } = getAlignmentClasses(columnMeta?.align);
          const isFirstColumn = cellIndex === 0;
          const paddingLeft = isFirstColumn ? getNestedRowPadding(depth) : undefined;
          const pinnedStyles = column.getIsPinned() ? getColumnPinningStyles(column) : undefined;

          const value = cell.getValue();
          const formattedValue = (
            columnMeta?.formatFn
              ? columnMeta.formatFn(value, cell.getContext())
              : columnMeta?.formatType
                ? formatAndTrimValue(value, columnMeta.formatType, columnMeta.formatOptions)
                : undefined
          ) as ReactNode;

          const cellContent = flexRender(columnDef.cell, {
            ...cell.getContext(),
            getValue: () => (formattedValue ?? value) as never,
          });

          const cellWidth = features?.columnResizing ? column.getSize() : columnMeta?.width;

          // Editing state
          const columnId = column.id;
          const rowId = row.id;
          const isEditable = editingEnabled && columnMeta?.editable === true;
          const isCellEditing = isEditable && isEditingCell?.(rowId, columnId);

          // Range selection state
          const cellSelected = rangeSelectionEnabled && rowVisualIndex !== undefined
            ? isCellSelected?.(rowVisualIndex, cellIndex)
            : false;
          const cellActive = rangeSelectionEnabled && rowVisualIndex !== undefined
            ? isActiveCell?.(rowVisualIndex, cellIndex)
            : false;

          return (
            <td
              key={cell.id}
              className={cn(
                "px-3 py-2 text-sm",
                pinnedStyles ? "bg-white hover:bg-gray-50" : "",
                cellSelected && "bg-blue-50",
                cellActive && "ring-2 ring-blue-500 ring-inset",
                columnMeta?.cellClassName
              )}
              style={{
                paddingLeft,
                width: cellWidth,
                minWidth: columnMeta?.minWidth,
                maxWidth: columnMeta?.maxWidth,
                ...pinnedStyles,
              }}
              onMouseDown={rangeSelectionEnabled && rowVisualIndex !== undefined
                ? (e) => onCellMouseDown?.(rowVisualIndex, cellIndex, e)
                : undefined}
              onMouseEnter={rangeSelectionEnabled && rowVisualIndex !== undefined
                ? () => onCellMouseEnter?.(rowVisualIndex, cellIndex)
                : undefined}
            >
              <div className={cn("flex items-start", justifyContent, textAlign)}>
                {isFirstColumn &&
                  (canExpand && shouldShowToggle ? (
                    <ExpandToggle isExpanded={isExpanded} onClick={handleExpandToggle} />
                  ) : depth > 0 ? (
                    <div className="w-2 mr-2 flex-shrink-0" />
                  ) : null)}

                {isEditable ? (
                  <EditableCell
                    isEditing={!!isCellEditing}
                    displayValue={cellContent}
                    rawValue={value}
                    row={originalRow}
                    rowId={rowId}
                    columnId={columnId}
                    editable={true}
                    editType={columnMeta?.editType}
                    editOptions={columnMeta?.editOptions}
                    customEditCell={columnMeta?.editCell as EditableCell<TData>["props"]["customEditCell"]}
                    onStartEdit={onStartEdit!}
                    onUpdateDraft={onUpdateDraft!}
                    onCommit={onCommitEdit!}
                    onCancel={onCancelEdit!}
                    draftValue={getDraft?.(rowId, columnId)}
                    error={getError?.(rowId, columnId)}
                  />
                ) : (
                  cellContent
                )}
              </div>
            </td>
          );
        })}
      </tr>

      {isExpanded && renderSubContent && (
        <tr>
          <td colSpan={row.getVisibleCells().length} className="p-0">
            <div className="px-4 py-3 bg-gray-50">{renderSubContent(originalRow)}</div>
          </td>
        </tr>
      )}
    </>
  );
};

// Type helper for EditableCell props extraction
type EditableCell<TData> = {
  props: {
    customEditCell?: (props: import("../../types").EditCellRenderProps<TData>) => ReactNode;
  };
};
