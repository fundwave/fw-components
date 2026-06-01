import type { Table } from "@tanstack/react-table";
import type { FormatOptions, ValueFormatType } from "../types";
import { formatValue } from "../utils/formatting";

// ============================================================================
// TYPES
// ============================================================================

export interface ExportColumn {
  /** Column ID */
  id: string;
  /** Display header */
  header: string;
  /** Value accessor (column key or function) */
  accessor?: string | ((row: Record<string, unknown>) => unknown);
  /** Format type for value formatting */
  formatType?: ValueFormatType;
  /** Format options */
  formatOptions?: FormatOptions;
  /** Column width in characters (for XLSX) */
  width?: number;
}

export interface ExportOptions<TData = unknown> {
  /** File name (without extension) */
  filename?: string;
  /** Sheet name */
  sheetName?: string;
  /** Columns to include (defaults to all visible) */
  columns?: ExportColumn[];
  /** Rows to export. If not set, exports all rows (or selected rows if `selectedOnly` is true) */
  rows?: TData[];
  /** Export only selected rows */
  selectedOnly?: boolean;
  /** Include headers in export */
  includeHeaders?: boolean;
  /** Custom export handler — if provided, receives the prepared data instead of downloading */
  onExport?: (data: ExportData) => void | Promise<void>;
  /** Date format for formatting dates in export */
  dateFormat?: string;
}

export interface ExportData {
  /** Column headers */
  headers: string[];
  /** Rows of cell values (string or number) */
  rows: (string | number | boolean | null)[][];
  /** Column metadata for width hints etc. */
  columns: ExportColumn[];
  /** File name */
  filename: string;
  /** Sheet name */
  sheetName: string;
}

// ============================================================================
// EXPORT FUNCTION
// ============================================================================

/**
 * Export grid data to Excel (CSV or custom handler).
 *
 * Usage:
 * ```tsx
 * // Default CSV download
 * exportGridData(table, { filename: "portfolio-assets" });
 *
 * // Custom handler (e.g., using SheetJS/xlsx)
 * exportGridData(table, {
 *   onExport: (data) => {
 *     const ws = XLSX.utils.aoa_to_sheet([data.headers, ...data.rows]);
 *     const wb = XLSX.utils.book_new();
 *     XLSX.utils.book_append_sheet(wb, ws, data.sheetName);
 *     XLSX.writeFile(wb, `${data.filename}.xlsx`);
 *   }
 * });
 * ```
 */
export async function exportGridData<TData>(
  table: Table<TData>,
  options: ExportOptions<TData> = {}
): Promise<void> {
  const {
    filename = "export",
    sheetName = "Sheet1",
    columns: customColumns,
    selectedOnly = false,
    includeHeaders = true,
    onExport,
  } = options;

  // Determine columns to export
  const exportColumns: ExportColumn[] = customColumns || getColumnsFromTable(table);

  // Determine rows to export
  let rows: TData[];
  if (options.rows) {
    rows = options.rows;
  } else if (selectedOnly) {
    rows = table.getSelectedRowModel().rows.map((r) => r.original);
  } else {
    rows = table.getRowModel().rows.map((r) => r.original);
  }

  // Build export data
  const headers = exportColumns.map((col) => col.header);
  const dataRows = rows.map((row) => {
    return exportColumns.map((col) => {
      const value = getColumnValue(row, col);
      return formatExportValue(value, col);
    });
  });

  const exportData: ExportData = {
    headers,
    rows: dataRows,
    columns: exportColumns,
    filename,
    sheetName,
  };

  // Use custom handler or default CSV download
  if (onExport) {
    await onExport(exportData);
  } else {
    downloadAsCSV(exportData, includeHeaders);
  }
}

// ============================================================================
// HELPERS
// ============================================================================

function getColumnsFromTable<TData>(table: Table<TData>): ExportColumn[] {
  return table
    .getVisibleLeafColumns()
    .filter((col) => {
      // Skip internal columns like selection checkbox
      return !col.id.startsWith("__");
    })
    .map((col) => {
      const meta = col.columnDef.meta || {};
      const header = typeof col.columnDef.header === "string"
        ? col.columnDef.header
        : col.id;

      return {
        id: col.id,
        header,
        accessor: (col.columnDef as { accessorKey?: string }).accessorKey || col.id,
        formatType: meta.formatType,
        formatOptions: meta.formatOptions,
        width: meta.width ? Number(meta.width) : undefined,
      };
    });
}

function getColumnValue<TData>(row: TData, col: ExportColumn): unknown {
  if (typeof col.accessor === "function") {
    return col.accessor(row as unknown as Record<string, unknown>);
  }
  const key = col.accessor || col.id;
  return (row as Record<string, unknown>)[key];
}

function formatExportValue(value: unknown, col: ExportColumn): string | number | boolean | null {
  if (value === null || value === undefined) return null;

  // Keep numbers as numbers for Excel compatibility
  if (typeof value === "number" && !col.formatType) return value;
  if (typeof value === "boolean") return value;

  // Format if formatType is specified
  if (col.formatType) {
    const formatted = formatValue(value, col.formatType, col.formatOptions);
    // Try to keep numeric formatted values as numbers
    if (col.formatType === "number" || col.formatType === "decimal") {
      const num = parseFloat(formatted.replace(/[^0-9.-]/g, ""));
      if (!isNaN(num)) return num;
    }
    return formatted;
  }

  // Default: stringify
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

// ============================================================================
// CSV DOWNLOAD (built-in fallback when no custom handler)
// ============================================================================

function downloadAsCSV(data: ExportData, includeHeaders: boolean): void {
  const rows: string[] = [];

  if (includeHeaders) {
    rows.push(escapeCSVRow(data.headers));
  }

  for (const row of data.rows) {
    rows.push(escapeCSVRow(row.map((cell) => (cell === null ? "" : String(cell)))));
  }

  const csv = rows.join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${data.filename}.csv`;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();

  // Cleanup
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

function escapeCSVRow(values: string[]): string {
  return values.map((val) => {
    if (val.includes(",") || val.includes('"') || val.includes("\n")) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  }).join(",");
}
