import type { Header } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import React, { useState } from "react";
import type { DataGridFeatures } from "../../types";
import { cn, getAlignmentClasses, getColumnPinningStyles } from "../../utils/styling";
import { ExpandToggle } from "../commons/ExpandToggle";
import { SortIndicator } from "../commons/SortIndicator";

export interface HeaderCellProps<TData> {
  header: Header<TData, unknown>;
  features?: DataGridFeatures;
  showExpandAll: boolean;
  isAllExpanded: boolean;
  onToggleAll: () => void;
}

export const HeaderCell = <TData,>({
  header,
  features,
  showExpandAll,
  isAllExpanded,
  onToggleAll,
}: HeaderCellProps<TData>) => {
  const column = header.column;
  const columnDef = column.columnDef;
  const isFirstColumn = column.getIndex() === 0;
  const meta = columnDef.meta || {};
  const { textAlign, justifyContent } = getAlignmentClasses(meta?.align);

  const canSort = column.getCanSort() && features?.sorting !== false;
  const isSorted = column.getIsSorted();
  // Matches DataGrid's `columnResizing !== false` default so handles appear whenever
  // the table is actually fixed-layout.
  const canResize = column.getCanResize() && features?.columnResizing !== false;
  // Fixed layout needs every header to carry a width, not just resizable columns.
  const useLayoutWidth = features?.columnResizing !== false;

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

  // TanStack's handler reads `event.shiftKey` for multi-sort — calling `toggleSorting()`
  // directly would ignore Shift.
  const toggleSortingHandler = column.getToggleSortingHandler();

  const handleSortClick = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (!canSort) return;
    const isEnterOrSpace = "key" in event && (event.key === "Enter" || event.key === " ");
    const isMouseClick = "button" in event;
    if (isEnterOrSpace || isMouseClick) {
      event.preventDefault();
      toggleSortingHandler?.(event);
    }
  };

  const handleResizeMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    header.getResizeHandler()?.(event);
  };

  // A placeholder header has no content of its own — rendering it would duplicate the
  // real column's label/sort/resize controls.
  if (header.isPlaceholder) {
    return (
      <th
        className={cn(
          "fwgrid:bg-gray-50 fwgrid:border-b-2 fwgrid:border-gray-200",
          meta?.headerClassName
        )}
        style={{
          ...pinningStyles,
          // header.getSize() sums grouped leaf columns; column.getSize() covers just one.
          width: useLayoutWidth ? header.getSize() : meta?.width,
          minWidth: meta?.minWidth,
          maxWidth: meta?.maxWidth,
        }}
        colSpan={header.colSpan}
      />
    );
  }

  return (
    <th
      className={cn(
        textAlign,
        "fwgrid:bg-gray-50 fwgrid:relative fwgrid:select-none fwgrid:px-3 fwgrid:py-2 fwgrid:text-left fwgrid:text-sm fwgrid:font-medium fwgrid:text-gray-700 fwgrid:border-b-2 fwgrid:border-gray-200",
        meta?.headerClassName
      )}
      style={{
        ...pinningStyles,
        width: useLayoutWidth ? header.getSize() : meta?.width,
        minWidth: meta?.minWidth,
        maxWidth: meta?.maxWidth,
      }}
      colSpan={header.colSpan}
      aria-sort={ariaSort}
    >
      <div className="fwgrid:flex fwgrid:flex-col">
        <div
          className={cn(
            "fwgrid:flex fwgrid:items-center fwgrid:gap-2 fwgrid:px-1 fwgrid:py-0.5 fwgrid:rounded fwgrid:transition-colors fwgrid:duration-200",
            justifyContent,
            canSort && "fwgrid:cursor-pointer fwgrid:hover:bg-gray-100"
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

          <div className="fwgrid:font-medium fwgrid:truncate fwgrid:min-w-0">{headerContent}</div>

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
            "fwgrid:absolute fwgrid:right-0 fwgrid:top-0 fwgrid:h-full fwgrid:w-1 fwgrid:cursor-col-resize fwgrid:border-r fwgrid:border-gray-200",
            "fwgrid:hover:border-transparent fwgrid:hover:bg-blue-500/70",
            "fwgrid:active:bg-blue-600",
            header.column.getIsResizing() && "fwgrid:bg-blue-600"
          )}
        />
      )}
    </th>
  );
};
