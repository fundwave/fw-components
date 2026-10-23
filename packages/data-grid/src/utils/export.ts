import type { Row, Table } from "@tanstack/react-table";
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
  /** Value accessor — a (optionally dotted) object path, or a function receiving the row and its index */
  accessor?: string | ((row: Record<string, unknown>, index: number) => unknown);
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
  /** Default date format for date-type columns. An explicit column `formatOptions.dateFormat` takes precedence over this. */
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
    dateFormat,
  } = options;

  // Determine columns to export
  const exportColumns: ExportColumn[] = customColumns || getColumnsFromTable(table);

  // Determine rows to export. Table-sourced rows keep their TanStack `Row` alongside the
  // original so values can be resolved through the column's actual accessorFn/accessorKey
  // (including computed accessors and dotted paths) rather than re-guessed here.
  let rows: TData[];
  let tableRows: Row<TData>[] | undefined;
  if (options.rows) {
    rows = options.rows;
  } else if (selectedOnly) {
    // `.rows` only holds the selected model's top-level entries; for hierarchical data a
    // selected child whose parent isn't selected (or a selected child under a selected
    // parent) can be missing from it. `.flatRows` has every selected row individually.
    tableRows = table.getSelectedRowModel().flatRows;
    rows = tableRows.map((r) => r.original);
  } else {
    tableRows = table.getRowModel().rows;
    rows = tableRows.map((r) => r.original);
  }

  // Build export data
  const headers = exportColumns.map((col) => col.header);
  const dataRows = rows.map((row, index) => {
    const tableRow = tableRows?.[index];
    return exportColumns.map((col) => {
      const value = getColumnValue(row, col, index, tableRow);
      return formatExportValue(value, col, dateFormat);
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

      // No explicit `accessor` here — getColumnValue falls back to the TanStack row's own
      // getValue(), which resolves the column's real accessorFn/accessorKey (computed
      // accessors and dotted keys included) instead of a re-guessed object property.
      return {
        id: col.id,
        header,
        formatType: meta.formatType,
        formatOptions: meta.formatOptions,
        width: meta.width ? Number(meta.width) : undefined,
      };
    });
}

function getByPath(obj: Record<string, unknown>, path: string): unknown {
  if (!path.includes(".")) return obj[path];
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

function getColumnValue<TData>(
  row: TData,
  col: ExportColumn,
  index: number,
  tableRow?: Row<TData>
): unknown {
  if (typeof col.accessor === "function") {
    return col.accessor(row as unknown as Record<string, unknown>, index);
  }
  if (col.accessor) {
    return getByPath(row as unknown as Record<string, unknown>, col.accessor);
  }
  if (tableRow) {
    return tableRow.getValue(col.id);
  }
  return getByPath(row as unknown as Record<string, unknown>, col.id);
}

function formatExportValue(
  value: unknown,
  col: ExportColumn,
  exportDateFormat?: string
): string | number | boolean | null {
  if (value === null || value === undefined) return null;

  // Keep numbers as numbers for Excel compatibility
  if (typeof value === "number" && !col.formatType) return value;
  if (typeof value === "boolean") return value;

  // Format if formatType is specified
  if (col.formatType) {
    const isScaled = col.formatOptions?.numberFormat === "Millions";
    // Scaled formats (e.g. "1.5M") lose their unit once parsed back to a plain number
    // (1,500,000 -> 1.5M -> 1.5). Export the unscaled raw number instead of the formatted text.
    if ((col.formatType === "number" || col.formatType === "decimal") && typeof value === "number" && isScaled) {
      return value;
    }

    // `ExportOptions.dateFormat` is the export-wide default; an explicit column-level
    // `formatOptions.dateFormat` is more specific and wins.
    const formatOptions =
      col.formatType === "date" && exportDateFormat
        ? { dateFormat: exportDateFormat, ...col.formatOptions }
        : col.formatOptions;

    const formatted = formatValue(value, col.formatType, formatOptions);
    // Try to keep numeric formatted values as numbers (only safe for unscaled formats)
    if ((col.formatType === "number" || col.formatType === "decimal") && !isScaled) {
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
    rows.push(escapeCSVRow(data.headers.map(sanitizeCSVFormula)));
  }

  for (const row of data.rows) {
    rows.push(
      escapeCSVRow(
        row.map((cell) => {
          if (cell === null) return "";
          // Only strings can carry an injected formula — numbers/booleans are left as-is
          // so genuine negative numbers aren't turned into text.
          return typeof cell === "string" ? sanitizeCSVFormula(cell) : String(cell);
        })
      )
    );
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

// Leading characters that spreadsheet applications treat as the start of a formula.
const CSV_FORMULA_TRIGGERS = ["=", "+", "-", "@", "\t", "\r"];

/**
 * Neutralize spreadsheet formula injection (e.g. a cell value of `=1+1`) by prefixing
 * it with a single quote, which Excel/Sheets render literally instead of evaluating.
 */
function sanitizeCSVFormula(value: string): string {
  if (value.length > 0 && CSV_FORMULA_TRIGGERS.includes(value[0])) {
    return `'${value}`;
  }
  return value;
}

function escapeCSVRow(values: string[]): string {
  return values.map((val) => {
    // `\r` must be quoted too — some CSV readers treat a bare CR as a record separator,
    // so an unquoted field containing one (e.g. "safe\r=1+1") can be split into a new
    // record whose content was never run through the formula sanitizer.
    if (val.includes(",") || val.includes('"') || val.includes("\n") || val.includes("\r")) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  }).join(",");
}
