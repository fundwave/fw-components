// ============================================================================
// @fw-components/data-grid
// A high-performance, editable data grid for React
// ============================================================================

// Main component
export { DataGrid } from "./components/DataGrid";

// Types
export * from "./types";

// Hooks (for advanced usage / custom implementations)
export { useEditing } from "./hooks/useEditing";
export { useBulkEdit } from "./hooks/useBulkEdit";
export { useDataGridState } from "./hooks/useDataGridState";
export { useControlledState } from "./hooks/useControlledState";
export { useRangeSelection } from "./hooks/useRangeSelection";
export type { CellPosition, CellRange, RangeSelectionState, UseRangeSelectionOptions, UseRangeSelectionReturn } from "./hooks/useRangeSelection";

// Export utilities
export { exportGridData } from "./utils/export";
export type { ExportColumn, ExportOptions, ExportData } from "./utils/export";

// Formatting & filtering utilities
export { formatValue, formatAndTrimValue, getCurrencySymbol } from "./utils/formatting";
export { buildSearchIndex, treeAwareGlobalFilterFn, normalize } from "./utils/filtering";
export { cn, getColumnPinningStyles, getAlignmentClasses, getNestedRowPadding } from "./utils/styling";

// Sub-components (for custom compositions)
export { HeaderCell } from "./components/header/HeaderCell";
export { DataRow } from "./components/row/DataRow";
export { EditableCell } from "./components/cell/EditableCell";
export { CellEditor } from "./components/cell/CellEditor";
export { SelectionCheckbox } from "./components/selection/SelectionCheckbox";
export { GridEmptyState } from "./components/states/GridEmptyState";
export { GridErrorState } from "./components/states/GridErrorState";
export { GridSkeleton } from "./components/states/GridSkeleton";
export { SortIndicator } from "./components/commons/SortIndicator";
export { ExpandToggle } from "./components/commons/ExpandToggle";
