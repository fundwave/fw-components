import type {
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  RowSelectionState,
  SortingState,
  TableState,
} from "@tanstack/react-table";
import type { TableStateHandlers } from "../types";
import { useControlledState } from "./useControlledState";

interface UseDataGridStateProps {
  state?: Partial<TableState>;
  onStateChange?: Partial<TableStateHandlers>;
  initialState?: Partial<TableState>;
}

/**
 * Central state management hook for the DataGrid.
 * Manages all table-level state with controlled/uncontrolled support.
 */
export const useDataGridState = ({ state, onStateChange, initialState }: UseDataGridStateProps) => {
  const [globalFilter, setGlobalFilter] = useControlledState<unknown>(
    state?.globalFilter,
    initialState?.globalFilter || "",
    onStateChange?.onGlobalFilterChange
  );

  const [sorting, setSorting] = useControlledState<SortingState>(
    state?.sorting,
    initialState?.sorting || [],
    onStateChange?.onSortingChange
  );

  const [expanded, setExpanded] = useControlledState<ExpandedState>(
    state?.expanded,
    initialState?.expanded || {},
    onStateChange?.onExpandedChange
  );

  const [columnSizing, setColumnSizing] = useControlledState<ColumnSizingState>(
    state?.columnSizing,
    initialState?.columnSizing || {},
    onStateChange?.onColumnSizingChange
  );

  const [columnPinning, setColumnPinning] = useControlledState<ColumnPinningState>(
    state?.columnPinning,
    initialState?.columnPinning || {},
    onStateChange?.onColumnPinningChange
  );

  const [rowSelection, setRowSelection] = useControlledState<RowSelectionState>(
    state?.rowSelection,
    initialState?.rowSelection || {},
    onStateChange?.onRowSelectionChange
  );

  return {
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
  };
};
