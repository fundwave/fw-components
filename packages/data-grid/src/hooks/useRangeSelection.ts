import { useCallback, useEffect, useRef, useState } from "react";

export interface CellPosition {
  rowIndex: number;
  columnIndex: number;
}

export interface CellRange {
  start: CellPosition;
  end: CellPosition;
}

export interface RangeSelectionState {
  activeCell: CellPosition | null;
  ranges: CellRange[];
  isSelecting: boolean;
}

export interface UseRangeSelectionOptions {
  rowCount: number;
  columnCount: number;
  skipColumns?: number[];
  onSelectionChange?: (state: RangeSelectionState) => void;
}

export interface UseRangeSelectionReturn {
  selectionState: RangeSelectionState;
  handleCellMouseDown: (rowIndex: number, columnIndex: number, event: React.MouseEvent) => void;
  handleCellMouseEnter: (rowIndex: number, columnIndex: number) => void;
  handleMouseUp: () => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  isCellSelected: (rowIndex: number, columnIndex: number) => boolean;
  isRowSelected: (rowIndex: number) => boolean;
  isColumnSelected: (columnIndex: number) => boolean;
  isActiveCell: (rowIndex: number, columnIndex: number) => boolean;
  selectAll: () => void;
  clearSelection: () => void;
  selectRow: (rowIndex: number, extend?: boolean) => void;
  selectColumn: (columnIndex: number, extend?: boolean) => void;
  getSelectedCells: () => CellPosition[];
  getSelectionBounds: () => { minRow: number; maxRow: number; minCol: number; maxCol: number } | null;
}

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
      // Computed against the ref, not inside the setState updater (must stay pure) —
      // StrictMode replays it, which would duplicate onSelectionChange calls.
      const prev = selectionRef.current;
      const next = updater(prev);
      if (next === prev) return;
      selectionRef.current = next;
      setSelectionState(next);
      onSelectionChange?.(next);
    },
    [onSelectionChange]
  );

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
      // No valid column in that direction — stay put instead of clamping onto a skipped one.
      if (next < 0 || next >= columnCount) return current;
      return next;
    },
    [columnCount, skipColumns]
  );

  const handleCellMouseDown = useCallback(
    (rowIndex: number, columnIndex: number, event: React.MouseEvent) => {
      const isShift = event.shiftKey;
      const isCtrlOrMeta = event.ctrlKey || event.metaKey;

      if (isShift && selectionRef.current.activeCell) {
        updateState((prev) => ({
          ...prev,
          ranges: [
            ...prev.ranges.slice(0, -1),
            { start: prev.activeCell!, end: { rowIndex, columnIndex } },
          ],
          isSelecting: true,
        }));
      } else if (isCtrlOrMeta) {
        updateState((prev) => ({
          activeCell: { rowIndex, columnIndex },
          ranges: [...prev.ranges, { start: { rowIndex, columnIndex }, end: { rowIndex, columnIndex } }],
          isSelecting: true,
        }));
      } else {
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
    updateState((prev) => (prev.isSelecting ? { ...prev, isSelecting: false } : prev));
  }, [updateState]);

  // A drag ending outside the grid only fires `mouseup` on the document — without this,
  // `isSelecting` stays stuck true.
  useEffect(() => {
    if (!selectionState.isSelecting) return;
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [selectionState.isSelecting, handleMouseUp]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const { activeCell, ranges } = selectionRef.current;
      if (!activeCell) return;

      const isShift = event.shiftKey;
      const isCtrlOrMeta = event.ctrlKey || event.metaKey;

      if (isCtrlOrMeta && event.key === "a") {
        event.preventDefault();
        updateState((prev) => ({
          ...prev,
          ranges: [{ start: { rowIndex: 0, columnIndex: 0 }, end: { rowIndex: rowCount - 1, columnIndex: columnCount - 1 } }],
        }));
        return;
      }

      // Tab is left to native focus traversal — cells aren't individually focusable,
      // so intercepting it would trap focus here.
      if (event.key === "Tab") return;

      const lastRange = ranges[ranges.length - 1];
      const isExtending = isShift && !!lastRange;
      // Extending moves from the range's current endpoint, not the anchor, so repeated
      // presses keep growing the range instead of resetting it.
      const movingFrom = isExtending ? lastRange.end : activeCell;

      let newActive: CellPosition | null = null;

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          newActive = clamp({ rowIndex: movingFrom.rowIndex - 1, columnIndex: movingFrom.columnIndex });
          break;
        case "ArrowDown":
          event.preventDefault();
          newActive = clamp({ rowIndex: movingFrom.rowIndex + 1, columnIndex: movingFrom.columnIndex });
          break;
        case "ArrowLeft":
          event.preventDefault();
          newActive = clamp({ rowIndex: movingFrom.rowIndex, columnIndex: getNextColumn(movingFrom.columnIndex, -1) });
          break;
        case "ArrowRight":
          event.preventDefault();
          newActive = clamp({ rowIndex: movingFrom.rowIndex, columnIndex: getNextColumn(movingFrom.columnIndex, 1) });
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
        default:
          return;
      }

      if (!newActive) return;

      if (isShift) {
        updateState((prev) => {
          const prevLastRange = prev.ranges[prev.ranges.length - 1];
          if (!prevLastRange) {
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
              { start: prevLastRange.start, end: newActive! },
            ],
          };
        });
      } else {
        updateState(() => ({
          activeCell: newActive!,
          ranges: [{ start: newActive!, end: newActive! }],
          isSelecting: false,
        }));
      }
    },
    [updateState, clamp, getNextColumn, rowCount, columnCount]
  );

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
