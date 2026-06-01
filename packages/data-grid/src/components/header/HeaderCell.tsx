import type { Header } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import React, { useState } from "react";
import type { DataGridFeatures, OnInteractionCallback } from "../../types";
import { cn, getAlignmentClasses, getColumnPinningStyles } from "../../utils/styling";
import { ExpandToggle } from "../commons/ExpandToggle";
import { SortIndicator } from "../commons/SortIndicator";

export interface HeaderCellProps<TData> {
  header: Header<TData, unknown>;
  features?: DataGridFeatures;
  showExpandAll: boolean;
  isAllExpanded: boolean;
  onToggleAll: () => void;
  onInteraction?: OnInteractionCallback;
}

/**
 * Individual header cell with sorting, pinning, and resizing support.
 */
export const HeaderCell = <TData,>({
  header,
  features,
  showExpandAll,
  isAllExpanded,
  onToggleAll,
  onInteraction,
}: HeaderCellProps<TData>) => {
  const column = header.column;
  const columnDef = column.columnDef;
  const isFirstColumn = column.getIndex() === 0;
  const meta = columnDef.meta || {};
  const { textAlign, justifyContent } = getAlignmentClasses(meta?.align);

  const canSort = column.getCanSort() && features?.sorting !== false;
  const isSorted = column.getIsSorted();
  const canResize = column.getCanResize() && features?.columnResizing === true;

  const headerContent = flexRender(columnDef.header, header.getContext());
  const pinningStyles = getColumnPinningStyles(column);
  const ariaSort = canSort
    ? isSorted === "asc"
      ? "ascending"
      : isSorted === "desc"
        ? "descending"
        : "none"
    : undefined;

  const [isHovered, setIsHovered] = useState(false);

  const handleSortClick = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (!canSort) return;
    const isEnterOrSpace = "key" in event && (event.key === "Enter" || event.key === " ");
    const isMouseClick = "button" in event;
    if (isEnterOrSpace || isMouseClick) {
      event.preventDefault();
      column.toggleSorting();
      onInteraction?.(`Sorted Column ${isSorted ? "Descending" : "Ascending"}`, { type: "sorting" });
    }
  };

  const handleResizeMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    header.getResizeHandler()?.(event);
    onInteraction?.("Resized Column", { type: "resizing" });
  };

  return (
    <th
      className={cn(
        textAlign,
        "bg-gray-50 relative select-none px-3 py-2 text-left text-sm font-medium text-gray-700 border-b-2 border-gray-200",
        meta?.headerClassName
      )}
      style={{
        ...pinningStyles,
        width: canResize ? column.getSize() : meta?.width,
        minWidth: meta?.minWidth,
        maxWidth: meta?.maxWidth,
      }}
      aria-sort={ariaSort}
    >
      <div className="flex flex-col">
        <div
          className={cn(
            "flex items-center gap-2 px-1 py-0.5 rounded transition-colors duration-200",
            justifyContent,
            canSort && "cursor-pointer hover:bg-gray-100"
          )}
          onClick={handleSortClick}
          onKeyDown={handleSortClick}
          onMouseEnter={() => canSort && setIsHovered(true)}
          onMouseLeave={() => canSort && setIsHovered(false)}
          role={canSort ? "button" : undefined}
          tabIndex={canSort ? 0 : undefined}
        >
          {showExpandAll && isFirstColumn && (
            <div onClick={(e) => e.stopPropagation()}>
              <ExpandToggle isExpanded={isAllExpanded} onClick={onToggleAll} />
            </div>
          )}

          {meta?.align === "right" && canSort && (
            <SortIndicator isSorted={isSorted} isHovered={isHovered} />
          )}

          <span className="font-medium truncate">{headerContent}</span>

          {meta?.align !== "right" && canSort && (
            <SortIndicator isSorted={isSorted} isHovered={isHovered} />
          )}
        </div>
      </div>

      {canResize && (
        <div
          onMouseDown={handleResizeMouseDown}
          onTouchStart={handleResizeMouseDown}
          className={cn(
            "absolute right-0 top-0 h-full w-1 cursor-col-resize border-r border-gray-200",
            "hover:border-transparent hover:bg-blue-500/70",
            "active:bg-blue-600",
            header.column.getIsResizing() && "bg-blue-600"
          )}
        />
      )}
    </th>
  );
};
