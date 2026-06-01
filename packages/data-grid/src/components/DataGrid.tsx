import {
  type ColumnDef,
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
import { HeaderCell } from "./header/HeaderCell";
import { DataRow } from "./row/DataRow";
import { SelectionCheckbox } from "./selection/SelectionCheckbox";
import { GridEmptyState } from "./states/GridEmptyState";
import { GridErrorState } from "./states/GridErrorState";
import { GridSkeleton } from "./states/GridSkeleton";

/**
 * A high-performance, editable data grid built on TanStack Table with built-in virtualization.
 *
 * Features:
 * - Row virtualization for rendering thousands of rows efficiently
 * - Cell-level and bulk editing
 * - Column sorting, pinning, and resizing
 * - Global text search/filter
 * - Row expansion for hierarchical data
 * - Row selection with checkboxes
 * - Fully controlled or uncontrolled state
 *
 * @example
 * ```tsx
 * <DataGrid
 *   data={assets}
 *   columns={columns}
 *   getRowId={(row) => row.id}
 *   features={{ editing: true, rowSelection: true, virtualization: true }}
 *   onCellEdit={({ rowId, columnId, value }) => updateAsset(rowId, columnId, value)}
 * />
 * ```
 */
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

  onCellEdit,
  onBulkEdit: _onBulkEdit,
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
  // ============================================================================
  // CONFIGURATION
  // ============================================================================

  const globalFilteringEnabled = features.globalFilter !== false;
  const manualFiltering = typeof features.globalFilter === "object" && features.globalFilter.manual === true;
  const sortingEnabled = features.sorting !== false;
  const multiSort = typeof features.sorting === "object" && features.sorting.multi === true;
  const manualSorting = typeof features.sorting === "object" && features.sorting.manual === true;
  const expandingEnabled = features.expanding !== false;
  const columnResizingEnabled = features.columnResizing !== false;
  const columnPinningEnabled = features.columnPinning !== false;
  const virtualizationEnabled = features.virtualization !== false;

  // Row selection config
  const rowSelectionEnabled = features.rowSelection !== undefined && features.rowSelection !== false;
  const rowSelectionConfig: RowSelectionConfig = typeof features.rowSelection === "object"
    ? features.rowSelection
    : { enabled: rowSelectionEnabled };

  // Editing config
  const editingEnabled = features.editing !== undefined && features.editing !== false;
  const editingConfig = typeof features.editing === "object" ? features.editing : { enabled: editingEnabled };
  const commitOnBlur = editingConfig.commitOnBlur !== false;

  // Range selection config
  const rangeSelectionEnabled = features.rangeSelection === true;

  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

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

  // ============================================================================
  // EDITING
  // ============================================================================

  const editing = useEditing({
    onCellEdit: editingEnabled
      ? (rowId, columnId, value, previousValue) => {
          const row = data.find((_, idx) => {
            const id = userGetRowId ? userGetRowId(data[idx], idx) : String(idx);
            return id === rowId;
          });
          onCellEdit?.({
            rowId,
            columnId,
            value,
            previousValue,
            row: row as TData,
          });
          onInteraction?.("Cell Edited", { label: `${rowId}:${columnId}`, type: "cellEdit" });
        }
      : undefined,
    validateCell: validateCell
      ? async (value, rowId, columnId) => {
          const row = data.find((_, idx) => {
            const id = userGetRowId ? userGetRowId(data[idx], idx) : String(idx);
            return id === rowId;
          });
          return validateCell(value, row as TData, columnId);
        }
      : undefined,
    commitOnBlur,
  });

  // ============================================================================
  // COLUMNS (with selection column prepended if enabled)
  // ============================================================================

  const columns = useMemo(() => {
    const cols = [...userColumns] as ColumnDef<TData, unknown>[];

    if (rowSelectionEnabled) {
      const selectionCol: ColumnDef<TData, unknown> = {
        id: "__selection",
        header: ({ table }) => (
          <SelectionCheckbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={(checked) => table.toggleAllRowsSelected(checked)}
            label="Select all rows"
            disabled={rowSelectionConfig.enableSelectAll === false}
          />
        ),
        cell: ({ row }) => (
          <SelectionCheckbox
            checked={row.getIsSelected()}
            onChange={(checked) => row.toggleSelected(checked)}
            label={`Select row ${row.id}`}
          />
        ),
        size: rowSelectionConfig.width || 40,
        enableSorting: false,
        enableResizing: false,
        meta: {
          align: "center" as const,
          width: rowSelectionConfig.width || 40,
          maxWidth: rowSelectionConfig.width || 40,
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

  // ============================================================================
  // TABLE SETUP
  // ============================================================================

  const indexedData = useMemo(() => buildSearchIndex(data), [data]);

  const table = useReactTable({
    data: indexedData,
    columns,
    getRowId: userGetRowId
      ? (row: TData, index: number) => userGetRowId(row, index)
      : (row: TData, index: number) => {
          if ("id" in row && typeof row.id === "string") return row.id;
          return String(index);
        },
    getCoreRowModel: getCoreRowModel(),

    // Global Filtering
    globalFilterFn:
      globalFilterConfig.globalFilterFn ||
      (expandingEnabled ? (treeAwareGlobalFilterFn as FilterFn<TData>) : "includesString"),
    getFilteredRowModel: globalFilteringEnabled ? getFilteredRowModel() : undefined,
    manualFiltering,
    filterFromLeafRows: true,

    // Sorting
    getSortedRowModel: sortingEnabled ? getSortedRowModel() : undefined,
    enableSorting: sortingEnabled,
    enableMultiSort: multiSort,
    manualSorting,

    // Expanding
    getExpandedRowModel: expandingEnabled ? getExpandedRowModel() : undefined,
    getSubRows: expandConfig?.getSubRows
      ? expandConfig.getSubRows
      : (row) => (row as Record<string, unknown>).subRows as TData[] | undefined,
    getRowCanExpand: (row) => row.subRows?.length > 0 || !!expandConfig?.renderSubContent,
    enableExpanding: expandingEnabled,

    // Row Selection
    enableRowSelection: rowSelectionEnabled,

    // Column Features
    enableColumnResizing: columnResizingEnabled,
    columnResizeMode: "onChange",
    enablePinning: columnPinningEnabled,

    // State
    state: {
      globalFilter,
      sorting,
      expanded,
      columnSizing,
      columnPinning,
      rowSelection,
    },

    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onColumnSizingChange: setColumnSizing,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
  });

  // Expose table instance
  useEffect(() => {
    if (onTableReady) onTableReady(table);
  }, [table, onTableReady]);

  // ============================================================================
  // VIRTUALIZATION
  // ============================================================================

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

  // ============================================================================
  // RANGE SELECTION (integrated)
  // ============================================================================

  const rangeSelection = useRangeSelection({
    rowCount: rows.length,
    columnCount: columns.length,
    skipColumns: rowSelectionEnabled ? [0] : [], // skip checkbox column
  });

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderRow = (row: Row<TData>, dataIndex?: number, rowVisualIndex?: number) => (
    <DataRow
      key={row.id}
      row={row}
      features={features}
      renderSubContent={expandConfig?.renderSubContent}
      showExpandToggle={expandConfig?.showExpandToggle}
      getRowClassName={getRowClassName}
      dataIndex={dataIndex}
      onInteraction={onInteraction}
      onRowClick={onRowClick}
      editingEnabled={editingEnabled}
      isEditingCell={editing.isEditing}
      getDraft={editing.getDraft}
      getError={editing.getError}
      onStartEdit={editing.startEditing}
      onUpdateDraft={editing.updateDraft}
      onCommitEdit={(rowId, columnId) => { editing.commitEdit(rowId, columnId); }}
      onCancelEdit={editing.cancelEdit}
      rangeSelectionEnabled={rangeSelectionEnabled}
      onCellMouseDown={rangeSelectionEnabled ? rangeSelection.handleCellMouseDown : undefined}
      onCellMouseEnter={rangeSelectionEnabled ? rangeSelection.handleCellMouseEnter : undefined}
      isCellSelected={rangeSelectionEnabled ? rangeSelection.isCellSelected : undefined}
      isActiveCell={rangeSelectionEnabled ? rangeSelection.isActiveCell : undefined}
      rowVisualIndex={rowVisualIndex}
    />
  );

  const renderRows = () => {
    if (virtualizationEnabled && scrollElement) {
      const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
      const paddingBottom =
        virtualRows.length > 0
          ? rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end
          : 0;

      return (
        <>
          {paddingTop > 0 && (
            <tr style={{ height: `${paddingTop}px` }}>
              <td colSpan={columns.length} />
            </tr>
          )}
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<TData>;
            return renderRow(row, virtualRow.index, virtualRow.index);
          })}
          {paddingBottom > 0 && (
            <tr style={{ height: `${paddingBottom}px` }}>
              <td colSpan={columns.length} />
            </tr>
          )}
        </>
      );
    }

    return rows.map((row, index) => renderRow(row, undefined, index));
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  const hasData = data.length > 0;
  const isSearchEmpty =
    globalFilteringEnabled && !!globalFilter && table.getRowModel().rows.length === 0;
  const tableWidth = columnResizingEnabled ? `max(${table.getTotalSize()}px, 100%)` : "100%";

  return (
    <div
      className={cn("w-full", className)}
      role="grid"
      aria-busy={isLoading}
      tabIndex={rangeSelectionEnabled ? 0 : undefined}
      onKeyDown={rangeSelectionEnabled ? rangeSelection.handleKeyDown : undefined}
      onMouseUp={rangeSelectionEnabled ? rangeSelection.handleMouseUp : undefined}
    >
      {/* Loading progress bar */}
      {isLoading && (
        <div className="w-full h-1 bg-gray-100 overflow-hidden">
          <div className="h-full bg-blue-500 animate-pulse w-1/3" />
        </div>
      )}

      {/* Table container with scroll */}
      <div
        ref={tableContainerRef}
        className={cn("overflow-auto", tableContainerClassName)}
      >
        <table
          className="w-full border-collapse"
          style={{ width: tableWidth }}
          role="grid"
        >
          <thead className="sticky top-0 z-20 bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b-2 border-gray-200">
                {headerGroup.headers.map((header) => (
                  <HeaderCell
                    key={header.id}
                    header={header}
                    features={features}
                    showExpandAll={expandConfig?.showAllExpand ?? false}
                    isAllExpanded={table.getIsAllRowsExpanded()}
                    onToggleAll={() => table.toggleAllRowsExpanded()}
                    onInteraction={onInteraction}
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
