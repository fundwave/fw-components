import { useCallback, useRef, useState } from "react";

// ============================================================================
// TYPES
// ============================================================================

export interface CellPosition {
  rowIndex: number;
  columnIndex: number;
}

export interface CellRange {
  start: CellPosition;
  end: CellPosition;
}

export interface RangeSelectionState {
  /** Currently active/focused cell */
  activeCell: CellPosition | null;
  /** Selected ranges (supports multi-range with Ctrl) */
  ranges: CellRange[];
  /** Whether user is currently dragging/extending a selection */
  isSelecting: boolean;
}

export interface UseRangeSelectionOptions {
  /** Total row count */
  rowCount: number;
  /** Total column count */
  columnCount: number;
  /** Columns to skip during selection (e.g., checkbox column) */
  skipColumns?: number[];
  /** Called when selection changes */
  onSelectionChange?: (state: RangeSelectionState) => void;
}

export interface UseRangeSelectionReturn {
  /** Current selection state */
  selectionState: RangeSelectionState;
  /** Handle cell mouse down (start selection) */
  handleCellMouseDown: (rowIndex: number, columnIndex: number, event: React.MouseEvent) => void;
  /** Handle cell mouse enter (extend selection while dragging) */
  handleCellMouseEnter: (rowIndex: number, columnIndex: number) => void;
  /** Handle mouse up (end selection) */
  handleMouseUp: () => void;
  /** Handle keyboard navigation and selection */
  handleKeyDown: (event: React.KeyboardEvent) => void;
  /** Check if a cell is within any selected range */
  isCellSelected: (rowIndex: number, columnIndex: number) => boolean;
  /** Check if an entire row is selected */
  isRowSelected: (rowIndex: number) => boolean;
  /** Check if an entire column is selected */
  isColumnSelected: (columnIndex: number) => boolean;
  /** Check if a cell is the active (focused) cell */
  isActiveCell: (rowIndex: number, columnIndex: number) => boolean;
  /** Select all cells */
  selectAll: () => void;
  /** Clear all selection */
  clearSelection: () => void;
  /** Select an entire row */
  selectRow: (rowIndex: number, extend?: boolean) => void;
  /** Select an entire column */
  selectColumn: (columnIndex: number, extend?: boolean) => void;
  /** Get all selected cell positions */
  getSelectedCells: () => CellPosition[];
  /** Get the bounding rectangle of the selection */
  getSelectionBounds: () => { minRow: number; maxRow: number; minCol: number; maxCol: number } | null;
}

// ============================================================================
// HELPERS
// ============================================================================

function normalizRange(range: CellRange): { minRow: number; maxRow: number; minCol: number; maxCol: number } {
  return {
    minRow: Math.min(range.start.rowIndex, range.end.rowIndex),
    maxRow: Math.max(range.start.rowIndex, range.end.rowIndex),
    minCol: Math.min(range.start.columnIndex, range.end.columnIndex),
    maxCol: Math.max(range.start.columnIndex, range.end.columnIndex),
  };
}

function isCellInRange(rowIndex: number, columnIndex: number, range: CellRange): boolean {
  const { minRow, maxRow, minCol, maxCol } = normalizRange(range);
  return rowIndex >= minRow && rowIndex <= maxRow && columnIndex >= minCol && columnIndex <= maxCol;
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * Hook for Excel-like range selection.
 *
 * Supports:
 * - Click to select a single cell
 * - Shift+Click to extend selection from active cell
 * - Ctrl/Cmd+Click to add a new range (multi-select)
 * - Click+Drag to select a range
 * - Shift+Arrow keys to extend selection
 * - Ctrl+A to select all
 * - Row header click to select entire row
 * - Column header click to select entire column
 */
export function useRangeSelection(options: UseRangeSelectionOptions): UseRangeSelectionReturn {
  const { rowCount, columnCount, skipColumns = [], onSelectionChange } = options;

  const [selectionState, setSelectionState] = useState<RangeSelectionState>({
    activeCell: null,
    ranges: [],
    isSelecting: false,
  });

  const selectionRef = useRef(selectionState);
  selectionRef.current = selectionState;

  const updateState = useCallback(
    (updater: (prev: RangeSelectionState) => RangeSelectionState) => {
      setSelectionState((prev) => {
        const next = updater(prev);
        onSelectionChange?.(next);
        return next;
      });
    },
    [onSelectionChange]
  );

  // Clamp position within grid bounds
  const clamp = useCallback(
    (pos: CellPosition): CellPosition => ({
      rowIndex: Math.max(0, Math.min(pos.rowIndex, rowCount - 1)),
      columnIndex: Math.max(0, Math.min(pos.columnIndex, columnCount - 1)),
    }),
    [rowCount, columnCount]
  );

  const getNextColumn = useCallback(
    (current: number, direction: 1 | -1): number => {
      let next = current + direction;
      while (next >= 0 && next < columnCount && skipColumns.includes(next)) {
        next += direction;
      }
      return Math.max(0, Math.min(next, columnCount - 1));
    },
    [columnCount, skipColumns]
  );

  // ============================================================================
  // MOUSE HANDLERS
  // ============================================================================

  const handleCellMouseDown = useCallback(
    (rowIndex: number, columnIndex: number, event: React.MouseEvent) => {
      const isShift = event.shiftKey;
      const isCtrlOrMeta = event.ctrlKey || event.metaKey;

      if (isShift && selectionRef.current.activeCell) {
        // Extend selection from active cell to clicked cell
        updateState((prev) => ({
          ...prev,
          ranges: [
            ...prev.ranges.slice(0, -1),
            { start: prev.activeCell!, end: { rowIndex, columnIndex } },
          ],
          isSelecting: true,
        }));
      } else if (isCtrlOrMeta) {
        // Add new range (multi-select)
        updateState((prev) => ({
          activeCell: { rowIndex, columnIndex },
          ranges: [...prev.ranges, { start: { rowIndex, columnIndex }, end: { rowIndex, columnIndex } }],
          isSelecting: true,
        }));
      } else {
        // New single selection
        updateState(() => ({
          activeCell: { rowIndex, columnIndex },
          ranges: [{ start: { rowIndex, columnIndex }, end: { rowIndex, columnIndex } }],
          isSelecting: true,
        }));
      }
    },
    [updateState]
  );

  const handleCellMouseEnter = useCallback(
    (rowIndex: number, columnIndex: number) => {
      if (!selectionRef.current.isSelecting) return;

      updateState((prev) => {
        if (prev.ranges.length === 0) return prev;
        const lastRange = prev.ranges[prev.ranges.length - 1];
        return {
          ...prev,
          ranges: [
            ...prev.ranges.slice(0, -1),
            { start: lastRange.start, end: { rowIndex, columnIndex } },
          ],
        };
      });
    },
    [updateState]
  );

  const handleMouseUp = useCallback(() => {
    updateState((prev) => ({ ...prev, isSelecting: false }));
  }, [updateState]);

  // ============================================================================
  // KEYBOARD HANDLER
  // ============================================================================

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const { activeCell } = selectionRef.current;
      if (!activeCell) return;

      const isShift = event.shiftKey;
      const isCtrlOrMeta = event.ctrlKey || event.metaKey;

      // Ctrl+A: Select all
      if (isCtrlOrMeta && event.key === "a") {
        event.preventDefault();
        updateState((prev) => ({
          ...prev,
          ranges: [{ start: { rowIndex: 0, columnIndex: 0 }, end: { rowIndex: rowCount - 1, columnIndex: columnCount - 1 } }],
        }));
        return;
      }

      let newActive: CellPosition | null = null;

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          newActive = clamp({ rowIndex: activeCell.rowIndex - 1, columnIndex: activeCell.columnIndex });
          break;
        case "ArrowDown":
          event.preventDefault();
          newActive = clamp({ rowIndex: activeCell.rowIndex + 1, columnIndex: activeCell.columnIndex });
          break;
        case "ArrowLeft":
          event.preventDefault();
          newActive = clamp({ rowIndex: activeCell.rowIndex, columnIndex: getNextColumn(activeCell.columnIndex, -1) });
          break;
        case "ArrowRight":
          event.preventDefault();
          newActive = clamp({ rowIndex: activeCell.rowIndex, columnIndex: getNextColumn(activeCell.columnIndex, 1) });
          break;
        case "Home":
          event.preventDefault();
          if (isCtrlOrMeta) {
            newActive = { rowIndex: 0, columnIndex: 0 };
          } else {
            newActive = { rowIndex: activeCell.rowIndex, columnIndex: 0 };
          }
          break;
        case "End":
          event.preventDefault();
          if (isCtrlOrMeta) {
            newActive = { rowIndex: rowCount - 1, columnIndex: columnCount - 1 };
          } else {
            newActive = { rowIndex: activeCell.rowIndex, columnIndex: columnCount - 1 };
          }
          break;
        case "Tab":
          event.preventDefault();
          if (isShift) {
            newActive = clamp({ rowIndex: activeCell.rowIndex, columnIndex: getNextColumn(activeCell.columnIndex, -1) });
          } else {
            newActive = clamp({ rowIndex: activeCell.rowIndex, columnIndex: getNextColumn(activeCell.columnIndex, 1) });
          }
          break;
        default:
          return;
      }

      if (!newActive) return;

      if (isShift && event.key !== "Tab") {
        // Extend selection
        updateState((prev) => {
          const lastRange = prev.ranges[prev.ranges.length - 1];
          if (!lastRange) {
            return {
              ...prev,
              activeCell: newActive!,
              ranges: [{ start: activeCell, end: newActive! }],
            };
          }
          return {
            ...prev,
            ranges: [
              ...prev.ranges.slice(0, -1),
              { start: lastRange.start, end: newActive! },
            ],
          };
        });
      } else {
        // Move active cell (new single selection)
        updateState(() => ({
          activeCell: newActive!,
          ranges: [{ start: newActive!, end: newActive! }],
          isSelecting: false,
        }));
      }
    },
    [updateState, clamp, getNextColumn, rowCount, columnCount]
  );

  // ============================================================================
  // QUERY METHODS
  // ============================================================================

  const isCellSelected = useCallback(
    (rowIndex: number, columnIndex: number): boolean => {
      return selectionRef.current.ranges.some((range) => isCellInRange(rowIndex, columnIndex, range));
    },
    []
  );

  const isRowSelected = useCallback(
    (rowIndex: number): boolean => {
      return selectionRef.current.ranges.some((range) => {
        const { minRow, maxRow, minCol, maxCol } = normalizRange(range);
        return rowIndex >= minRow && rowIndex <= maxRow && minCol === 0 && maxCol === columnCount - 1;
      });
    },
    [columnCount]
  );

  const isColumnSelected = useCallback(
    (columnIndex: number): boolean => {
      return selectionRef.current.ranges.some((range) => {
        const { minRow, maxRow, minCol, maxCol } = normalizRange(range);
        return columnIndex >= minCol && columnIndex <= maxCol && minRow === 0 && maxRow === rowCount - 1;
      });
    },
    [rowCount]
  );

  const isActiveCell = useCallback(
    (rowIndex: number, columnIndex: number): boolean => {
      const active = selectionRef.current.activeCell;
      return active !== null && active.rowIndex === rowIndex && active.columnIndex === columnIndex;
    },
    []
  );

  const selectAll = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      ranges: [{ start: { rowIndex: 0, columnIndex: 0 }, end: { rowIndex: rowCount - 1, columnIndex: columnCount - 1 } }],
    }));
  }, [updateState, rowCount, columnCount]);

  const clearSelection = useCallback(() => {
    updateState(() => ({ activeCell: null, ranges: [], isSelecting: false }));
  }, [updateState]);

  const selectRow = useCallback(
    (rowIndex: number, extend = false) => {
      const range: CellRange = { start: { rowIndex, columnIndex: 0 }, end: { rowIndex, columnIndex: columnCount - 1 } };
      updateState((prev) => ({
        activeCell: { rowIndex, columnIndex: 0 },
        ranges: extend ? [...prev.ranges, range] : [range],
        isSelecting: false,
      }));
    },
    [updateState, columnCount]
  );

  const selectColumn = useCallback(
    (columnIndex: number, extend = false) => {
      const range: CellRange = { start: { rowIndex: 0, columnIndex }, end: { rowIndex: rowCount - 1, columnIndex } };
      updateState((prev) => ({
        activeCell: { rowIndex: 0, columnIndex },
        ranges: extend ? [...prev.ranges, range] : [range],
        isSelecting: false,
      }));
    },
    [updateState, rowCount]
  );

  const getSelectedCells = useCallback((): CellPosition[] => {
    const cells: CellPosition[] = [];
    const seen = new Set<string>();

    for (const range of selectionRef.current.ranges) {
      const { minRow, maxRow, minCol, maxCol } = normalizRange(range);
      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          const key = `${r}:${c}`;
          if (!seen.has(key)) {
            seen.add(key);
            cells.push({ rowIndex: r, columnIndex: c });
          }
        }
      }
    }

    return cells;
  }, []);

  const getSelectionBounds = useCallback((): { minRow: number; maxRow: number; minCol: number; maxCol: number } | null => {
    if (selectionRef.current.ranges.length === 0) return null;

    let minRow = Infinity, maxRow = -Infinity, minCol = Infinity, maxCol = -Infinity;
    for (const range of selectionRef.current.ranges) {
      const norm = normalizRange(range);
      minRow = Math.min(minRow, norm.minRow);
      maxRow = Math.max(maxRow, norm.maxRow);
      minCol = Math.min(minCol, norm.minCol);
      maxCol = Math.max(maxCol, norm.maxCol);
    }
    return { minRow, maxRow, minCol, maxCol };
  }, []);

  return {
    selectionState,
    handleCellMouseDown,
    handleCellMouseEnter,
    handleMouseUp,
    handleKeyDown,
    isCellSelected,
    isRowSelected,
    isColumnSelected,
    isActiveCell,
    selectAll,
    clearSelection,
    selectRow,
    selectColumn,
    getSelectedCells,
    getSelectionBounds,
  };
}
