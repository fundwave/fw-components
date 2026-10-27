import {
  type ColumnDef,
  type ColumnPinningState,
  type FilterFn,
  type Row,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useDataGridState } from "../hooks/useDataGridState";
import { useEditing } from "../hooks/useEditing";
import { useRangeSelection } from "../hooks/useRangeSelection";
import type { DataGridProps, RowSelectionConfig } from "../types";
import { buildSearchIndex, treeAwareGlobalFilterFn } from "../utils/filtering";
import { cn } from "../utils/styling";
import { Checkbox } from "./commons/Checkbox";
import { HeaderCell } from "./header/HeaderCell";
import { DataRow } from "./row/DataRow";
import { GridEmptyState } from "./states/GridEmptyState";
import { GridErrorState } from "./states/GridErrorState";
import { GridSkeleton } from "./states/GridSkeleton";

export const DataGrid = <TData extends object>({
  columns: userColumns = [],
  data = [],
  getRowId: userGetRowId,

  state,
  onStateChange,
  initialState,

  features = {},

  expandConfig = {},
  virtualizationConfig = {},
  globalFilterConfig = {},

  isRowSelectable,

  isRowEditable,
  onCellEdit,
  validateCell,

  onTableReady,
  onInteraction,
  onRowClick,

  className,
  tableContainerClassName,
  getRowClassName,

  isLoading,
  emptyState,
  errorMessage,
}: DataGridProps<TData>) => {
  const globalFilteringEnabled = features.globalFilter !== false;
  const manualFiltering = typeof features.globalFilter === "object" && features.globalFilter.manual === true;
  const sortingEnabled = features.sorting !== false;
  const multiSort = typeof features.sorting === "object" && features.sorting.multi === true;
  const manualSorting = typeof features.sorting === "object" && features.sorting.manual === true;
  const expandingEnabled = features.expanding !== false;
  const columnResizingEnabled = features.columnResizing !== false;
  const columnPinningEnabled = features.columnPinning !== false;
  const virtualizationEnabled = features.virtualization !== false;

  // An object config's `enabled` flag is authoritative — `{ enabled: false }` turns the
  // feature off, not truthy-on.
  const rowSelectionConfig: RowSelectionConfig =
    typeof features.rowSelection === "object"
      ? features.rowSelection
      : { enabled: features.rowSelection === true };
  const rowSelectionEnabled = rowSelectionConfig.enabled;

  // Editing config — same `enabled`-is-authoritative rule as row selection above.
  const editingConfig = typeof features.editing === "object"
    ? features.editing
    : { enabled: features.editing === true };
  const editingEnabled = editingConfig.enabled;
  const commitOnBlur = editingConfig.commitOnBlur !== false;

  const rangeSelectionEnabled = features.rangeSelection === true;

  const {
    globalFilter,
    setGlobalFilter,
    sorting,
    setSorting,
    expanded,
    setExpanded,
    columnSizing,
    setColumnSizing,
    columnPinning,
    setColumnPinning,
    rowSelection,
    setRowSelection,
  } = useDataGridState({ state, onStateChange, initialState });

  // Pinning is purely state-driven in TanStack (no per-column-def pin field), so the
  // selection column's pin side is merged into state here.
  const effectiveColumnPinning: ColumnPinningState = useMemo(() => {
    if (!rowSelectionEnabled || !rowSelectionConfig.pinned) return columnPinning;
    const side = rowSelectionConfig.pinned;
    const otherSide = side === "left" ? "right" : "left";
    return {
      ...columnPinning,
      [side]: Array.from(new Set([...(columnPinning[side] ?? []), "__selection"])),
      [otherSide]: (columnPinning[otherSide] ?? []).filter((id) => id !== "__selection"),
    };
  }, [columnPinning, rowSelectionEnabled, rowSelectionConfig.pinned]);

  const columns = useMemo(() => {
    const cols = [...userColumns] as ColumnDef<TData, unknown>[];

    if (rowSelectionEnabled) {
      const selectionCol: ColumnDef<TData, unknown> = {
        id: "__selection",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={(checked) => table.toggleAllRowsSelected(checked)}
            label="Select all rows"
            disabled={rowSelectionConfig.enableSelectAll === false}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onChange={(checked) => row.toggleSelected(checked)}
            label={`Select row ${row.id}`}
            disabled={!row.getCanSelect()}
          />
        ),
        size: rowSelectionConfig.width || 40,
        enableSorting: false,
        enableResizing: false,
        meta: {
          align: "center" as const,
          width: rowSelectionConfig.width || 40,
          maxWidth: rowSelectionConfig.width || 40,
          headerClassName: "px-0 py-0",
        },
      };

      if (rowSelectionConfig.columnPosition === "end") {
        cols.push(selectionCol);
      } else {
        cols.unshift(selectionCol);
      }
    }

    return cols;
  }, [userColumns, rowSelectionEnabled, rowSelectionConfig]);

  const indexedData = useMemo(() => buildSearchIndex(data), [data]);

  const table = useReactTable({
    data: indexedData,
    columns,
    getRowId: userGetRowId
      ? (row: TData, index: number) => userGetRowId(row, index)
      : (row: TData, index: number, parent?: Row<TData>) => {
          if ("id" in row && typeof row.id === "string") return row.id;
          // Index alone collides across sibling groups (root row 0 and its first child
          // both land on "0") — prefix with the parent id.
          return parent ? `${parent.id}.${index}` : String(index);
        },
    getCoreRowModel: getCoreRowModel(),

    globalFilterFn:
      globalFilterConfig.globalFilterFn ||
      (expandingEnabled ? (treeAwareGlobalFilterFn as FilterFn<TData>) : "includesString"),
    getFilteredRowModel: globalFilteringEnabled ? getFilteredRowModel() : undefined,
    manualFiltering,
    filterFromLeafRows: true,

    getSortedRowModel: sortingEnabled ? getSortedRowModel() : undefined,
    enableSorting: sortingEnabled,
    enableMultiSort: multiSort,
    manualSorting,

    getExpandedRowModel: expandingEnabled ? getExpandedRowModel() : undefined,
    getSubRows: expandConfig?.getSubRows
      ? expandConfig.getSubRows
      : (row) => (row as Record<string, unknown>).subRows as TData[] | undefined,
    getRowCanExpand: (row) => expandingEnabled && (row.subRows?.length > 0 || !!expandConfig?.renderSubContent),
    enableExpanding: expandingEnabled,

    enableRowSelection: rowSelectionEnabled && isRowSelectable ? (row) => isRowSelectable(row.original) : rowSelectionEnabled,

    enableColumnResizing: columnResizingEnabled,
    columnResizeMode: "onChange",
    enablePinning: columnPinningEnabled,

    initialState,
    state: {
      ...state,
      globalFilter,
      sorting,
      expanded,
      columnSizing,
      columnPinning: effectiveColumnPinning,
      rowSelection,
    },

    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onColumnSizingChange: setColumnSizing,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
  });

  useEffect(() => {
    if (onTableReady) onTableReady(table);
  }, [table, onTableReady]);

  const editing = useEditing({
    onCellEdit: editingEnabled
      ? async (rowId, columnId, value, previousValue) => {
          // table.getRow resolves the same identities/hierarchy the grid uses (custom
          // getRowId, nested rows) instead of re-implementing a lookup.
          const row = table.getRow(rowId, true).original as TData;
          await onCellEdit?.({ rowId, columnId, value, previousValue, row });
          // Reported only after the save succeeds, so a rejected save isn't tracked as
          // successful.
          onInteraction?.("Cell Edited", { label: `${rowId}:${columnId}`, type: "cellEdit" });
        }
      : undefined,
    validateCell: editingEnabled
      ? async (value, rowId, columnId) => {
          const row = table.getRow(rowId, true).original as TData;
          // Column-level `meta.validate` is public API and must run even when no
          // grid-level `validateCell` is supplied.
          const columnValidate = table.getColumn(columnId)?.columnDef.meta?.validate;
          if (columnValidate) {
            const columnError = await columnValidate(value, row);
            if (columnError) return columnError;
          }
          return validateCell ? validateCell(value, row, columnId) : null;
        }
      : undefined,
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null);
  const rows = table.getRowModel().rows;

  useEffect(() => {
    if (tableContainerRef.current) setScrollElement(tableContainerRef.current);
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollElement,
    estimateSize: useCallback(
      () => virtualizationConfig.estimatedRowHeight ?? 40,
      [virtualizationConfig.estimatedRowHeight]
    ),
    overscan: virtualizationConfig.overScan ?? 5,
    enabled: virtualizationEnabled && scrollElement !== null,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  const visibleLeafColumns = table.getVisibleLeafColumns();
  const selectionColumnIndex = rowSelectionEnabled
    ? visibleLeafColumns.findIndex((col) => col.id === "__selection")
    : -1;

  const rangeSelection = useRangeSelection({
    rowCount: rows.length,
    columnCount: visibleLeafColumns.length,
    skipColumns: selectionColumnIndex >= 0 ? [selectionColumnIndex] : [],
  });

  // Syncs DOM focus/scroll with the keyboard destination (last range's end, or activeCell
  // for a plain move) since neither followed the state update on its own.
  const lastRange = rangeSelection.selectionState.ranges[rangeSelection.selectionState.ranges.length - 1];
  const keyboardFocusTarget = lastRange?.end ?? rangeSelection.selectionState.activeCell;
  const isSelecting = rangeSelection.selectionState.isSelecting;

  useEffect(() => {
    // Skip during an active drag to avoid fighting the user's own scrolling; syncs once
    // the drag/click settles on mouseup.
    if (!rangeSelectionEnabled || !keyboardFocusTarget || isSelecting) return;
    const { rowIndex, columnIndex } = keyboardFocusTarget;

    const focusCell = () => {
      const el = tableContainerRef.current?.querySelector<HTMLElement>(
        `[data-row-index="${rowIndex}"][data-col-index="${columnIndex}"]`
      );
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ block: "nearest", inline: "nearest" });
    };

    if (virtualizationEnabled) {
      // The destination row may not be mounted yet — scroll it into the virtualizer's
      // range first.
      rowVirtualizer.scrollToIndex(rowIndex, { align: "auto" });
      requestAnimationFrame(focusCell);
    } else {
      focusCell();
    }
  }, [keyboardFocusTarget?.rowIndex, keyboardFocusTarget?.columnIndex, isSelecting, rangeSelectionEnabled, virtualizationEnabled, rowVirtualizer]);

  // Accounts for detail <tr> rows (not part of `rows`) so aria-rowindex/rowcount reflect
  // each row's true logical position.
  const { detailRowOffsets, totalDetailRows } = useMemo(() => {
    if (!expandConfig?.renderSubContent) return { detailRowOffsets: null as number[] | null, totalDetailRows: 0 };
    const offsets: number[] = new Array(rows.length);
    let count = 0;
    for (let i = 0; i < rows.length; i++) {
      offsets[i] = count;
      if (rows[i].getCanExpand() && rows[i].getIsExpanded()) count += 1;
    }
    return { detailRowOffsets: offsets, totalDetailRows: count };
  }, [rows, expandConfig?.renderSubContent]);

  // +1 for the header row.
  const ariaRowCount = rows.length + 1 + totalDetailRows;

  const renderRow = (
    row: Row<TData>,
    dataIndex?: number,
    rowVisualIndex?: number,
    measureRef?: (el: HTMLTableRowElement | null) => void
  ) => (
    <DataRow
      key={row.id}
      row={row}
      features={features}
      renderSubContent={expandConfig?.renderSubContent}
      showExpandToggle={expandConfig?.showExpandToggle}
      getRowClassName={getRowClassName}
      dataIndex={dataIndex}
      ariaRowIndex={
        rowVisualIndex !== undefined
          ? rowVisualIndex + 2 + (detailRowOffsets?.[rowVisualIndex] ?? 0)
          : undefined
      }
      onInteraction={onInteraction}
      onRowClick={onRowClick}
      editingEnabled={editingEnabled}
      isRowEditable={isRowEditable}
      isEditingCell={editing.isEditing}
      getDraft={editing.getDraft}
      getError={editing.getError}
      onStartEdit={editing.startEditing}
      onUpdateDraft={editing.updateDraft}
      onCommitEdit={(rowId, columnId) => { editing.commitEdit(rowId, columnId); }}
      onCancelEdit={editing.cancelEdit}
      commitOnBlur={commitOnBlur}
      rangeSelectionEnabled={rangeSelectionEnabled}
      onCellMouseDown={rangeSelectionEnabled ? rangeSelection.handleCellMouseDown : undefined}
      onCellMouseEnter={rangeSelectionEnabled ? rangeSelection.handleCellMouseEnter : undefined}
      isCellSelected={rangeSelectionEnabled ? rangeSelection.isCellSelected : undefined}
      isActiveCell={rangeSelectionEnabled ? rangeSelection.isActiveCell : undefined}
      rowVisualIndex={rowVisualIndex}
      measureRef={measureRef}
    />
  );

  const renderRows = () => {
    if (virtualizationEnabled) {
      // `scrollElement` is null until mount's effect runs — wait for it, or every row
      // mounts once then immediately tears down.
      if (!scrollElement) return null;

      const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
      const paddingBottom =
        virtualRows.length > 0
          ? rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end
          : 0;

      return (
        <>
          {paddingTop > 0 && (
            <tr aria-hidden="true" style={{ height: `${paddingTop}px` }}>
              <td colSpan={columns.length} />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<TData>;
            return renderRow(row, virtualRow.index, virtualRow.index, rowVirtualizer.measureElement);
          })}
          {paddingBottom > 0 && (
            <tr aria-hidden="true" style={{ height: `${paddingBottom}px` }}>
              <td colSpan={columns.length} />
            </tr>
          )}
        </>
      );
    }

    return rows.map((row, index) => renderRow(row, undefined, index));
  };

  const hasData = data.length > 0;
  const isSearchEmpty =
    globalFilteringEnabled && !!globalFilter && table.getRowModel().rows.length === 0;
  const tableWidth = columnResizingEnabled ? `max(${table.getTotalSize()}px, 100%)` : "100%";

  return (
    <div
      className={cn("w-full", className)}
      // No role="grid" here — the <table> below already owns it.
      aria-busy={isLoading}
      tabIndex={rangeSelectionEnabled ? 0 : undefined}
      onKeyDown={rangeSelectionEnabled ? rangeSelection.handleKeyDown : undefined}
      onMouseUp={rangeSelectionEnabled ? rangeSelection.handleMouseUp : undefined}
    >
      {isLoading && (
        <div className="w-full h-1 bg-gray-100 overflow-hidden">
          <div className="h-full bg-blue-500 animate-pulse w-1/3" />
        </div>
      )}

      <div
        ref={tableContainerRef}
        className={cn("overflow-auto", tableContainerClassName)}
      >
        <table
          className="w-full border-collapse"
          style={{ width: tableWidth, tableLayout: columnResizingEnabled ? "fixed" : undefined }}
          role="grid"
          aria-rowcount={ariaRowCount}
        >
          <thead className="sticky top-0 z-20 bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b-2 border-gray-200" aria-rowindex={1}>
                {headerGroup.headers.map((header) => (
                  <HeaderCell
                    key={header.id}
                    header={header}
                    features={features}
                    showExpandAll={expandConfig?.showAllExpand ?? false}
                    isAllExpanded={table.getIsAllRowsExpanded()}
                    onToggleAll={() => table.toggleAllRowsExpanded()}
                  />
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {errorMessage ? (
              <GridErrorState error={errorMessage} columnCount={columns.length} />
            ) : isLoading && !hasData ? (
              <GridSkeleton
                columns={columns as ColumnDef<unknown, unknown>[]}
                showExpand={expandingEnabled}
              />
            ) : !hasData ? (
              <GridEmptyState
                message={emptyState?.message}
                ctaLabel={emptyState?.ctaLabel}
                onCtaClick={emptyState?.onCtaClick}
                columnCount={columns.length}
              />
            ) : isSearchEmpty ? (
              <GridEmptyState
                message={emptyState?.emptySearchMessage || "No results found"}
                columnCount={columns.length}
              />
            ) : (
              renderRows()
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataGrid;
