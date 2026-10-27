import type { Row, Table } from "@tanstack/react-table";
import type { DateFormat, FormatOptions, ValueFormatType } from "../types";
import { formatValue } from "../utils/formatting";

export interface ExportColumn {
  id: string;
  header: string;
  accessor?: string | ((row: Record<string, unknown>, index: number) => unknown);
  formatType?: ValueFormatType;
  formatOptions?: FormatOptions;
  width?: number;
}

export interface ExportOptions<TData = unknown> {
  filename?: string;
  sheetName?: string;
  columns?: ExportColumn[];
  rows?: TData[];
  selectedOnly?: boolean;
  includeHeaders?: boolean;
  onExport?: (data: ExportData) => void | Promise<void>;
  dateFormat?: DateFormat;
}

export interface ExportData {
  headers: string[];
  rows: (string | number | boolean | null)[][];
  columns: ExportColumn[];
  filename: string;
  sheetName: string;
}

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

  const exportColumns: ExportColumn[] = customColumns || getColumnsFromTable(table);

  // Keeps the TanStack `Row` alongside each original so values resolve via the column's
  // real accessorFn/accessorKey, not a re-guessed path.
  let rows: TData[];
  let tableRows: Row<TData>[] | undefined;
  if (options.rows) {
    rows = options.rows;
  } else if (selectedOnly) {
    // `.rows` only holds top-level selected entries — a selected child can be missing
    // for hierarchical data. `.flatRows` has every selected row.
    tableRows = table.getSelectedRowModel().flatRows;
    rows = tableRows.map((r) => r.original);
  } else {
    tableRows = table.getRowModel().rows;
    rows = tableRows.map((r) => r.original);
  }

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

  if (onExport) {
    await onExport(exportData);
  } else {
    downloadAsCSV(exportData, includeHeaders);
  }
}

function getColumnsFromTable<TData>(table: Table<TData>): ExportColumn[] {
  return table
    .getVisibleLeafColumns()
    .filter((col) => {
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
  exportDateFormat?: DateFormat
): string | number | boolean | null {
  if (value === null || value === undefined) return null;

  if (typeof value === "number" && !col.formatType) return value;
  if (typeof value === "boolean") return value;

  if (col.formatType) {
    const isScaled = col.formatOptions?.numberFormat === "Millions";
    // Scaled formats (e.g. "1.5M") lose their unit when reparsed as a number — export
    // the unscaled raw value instead.
    if ((col.formatType === "number" || col.formatType === "decimal") && typeof value === "number" && isScaled) {
      return value;
    }

    // A column-level `formatOptions.dateFormat` is more specific than the export-wide
    // default and wins.
    const formatOptions =
      col.formatType === "date" && exportDateFormat
        ? { dateFormat: exportDateFormat, ...col.formatOptions }
        : col.formatOptions;

    const formatted = formatValue(value, col.formatType, formatOptions);
    // Strip only thousands-separator commas — stripping all non-digits also breaks
    // exponent notation (e.g. "1e-7" -> "1-7").
    if ((col.formatType === "number" || col.formatType === "decimal") && !isScaled) {
      const num = parseFloat(formatted.replace(/,/g, ""));
      if (!isNaN(num)) return num;
    }
    return formatted;
  }

  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

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
          // Only strings can carry an injected formula — numbers/booleans pass through
          // so negatives aren't stringified.
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

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

// Leading characters that spreadsheet applications treat as the start of a formula.
const CSV_FORMULA_TRIGGERS = ["=", "+", "-", "@", "\t", "\r"];

/**
 * Neutralizes formula injection (e.g. `=1+1`) with a leading quote, which Excel/Sheets
 * render literally.
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
    // letting unsanitized content leak into a new record.
    if (val.includes(",") || val.includes('"') || val.includes("\n") || val.includes("\r")) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  }).join(",");
}
