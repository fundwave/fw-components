import type {
  CellContext,
  ColumnDef,
  ColumnPinningState,
  ColumnSizingState,
  ExpandedState,
  FilterFn,
  OnChangeFn,
  Row,
  RowSelectionState,
  SortingState,
  Table,
  TableState,
} from "@tanstack/react-table";
import type { ReactNode } from "react";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    formatType?: ValueFormatType;
    formatOptions?: FormatOptions;
    /** Takes precedence over formatType */
    formatFn?: (value: TValue, cell: CellContext<TData, TValue>) => string | number | ReactNode;
    getSearchValue?: (value: TValue, row: TData) => string | number | null | undefined;
    align?: "left" | "center" | "right";
    width?: string | number;
    maxWidth?: string | number;
    minWidth?: string | number;
    headerClassName?: string;
    cellClassName?: string;
    editable?: boolean;
    editType?: CellEditType;
    editOptions?: SelectOption[];
    validate?: (value: unknown, row: TData) => string | null | Promise<string | null>;
    editCell?: (props: EditCellRenderProps<TData, TValue>) => ReactNode;
  }
}

export const ValueFormatType = {
  Currency: "currency",
  Percentage: "percentage",
  Decimal: "decimal",
  Number: "number",
  Text: "text",
  Date: "date",
  Ratio: "ratio",
  Boolean: "boolean",
} as const;
export type ValueFormatType = (typeof ValueFormatType)[keyof typeof ValueFormatType];

export const DateFormat = {
  MMDDYYYY: "MM/DD/YYYY",
  DDMMYYYY: "DD/MM/YYYY",
  YYYYMMDD: "YYYY-MM-DD",
  MMMDDYYYY: "MMM DD, YYYY",
} as const;
export type DateFormat = (typeof DateFormat)[keyof typeof DateFormat];

export type FormatOptions = {
  currencyCode?: string | null;
  numberFormat?: "000s" | "Millions" | null;
  decimals?: number | null;
  dateFormat?: DateFormat | null;
  formatAsUTC?: boolean | null;
  trim?: boolean | null;
  placeholder?: string;
};

export type CellEditType = "text" | "number" | "date" | "select" | "boolean" | "custom";

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface CellEditEvent<TData = unknown> {
  rowId: string;
  columnId: string;
  value: unknown;
  previousValue: unknown;
  row: TData;
}

export interface EditCellRenderProps<TData = unknown, TValue = unknown> {
  value: TValue;
  row: Row<TData>;
  columnId: string;
  onChange: (value: TValue) => void;
  onCommit: () => void;
  onCancel: () => void;
  error?: string | null;
}

export interface EditingState {
  editingCell: { rowId: string; columnId: string } | null;
  drafts: Record<string, unknown>;
  errors: Record<string, string>;
  dirtyCells: Set<string>;
}

/** Editing callbacks threaded from DataGrid through DataRow down to EditableCell. */
export interface EditingHandlers {
  isEditingCell: (rowId: string, columnId: string) => boolean;
  getDraft: (rowId: string, columnId: string) => unknown;
  getError: (rowId: string, columnId: string) => string | undefined;
  onStartEdit: (rowId: string, columnId: string, currentValue: unknown) => void;
  onUpdateDraft: (rowId: string, columnId: string, value: unknown) => void;
  onCommitEdit: (rowId: string, columnId: string) => void;
  onCancelEdit: () => void;
  commitOnBlur?: boolean;
}

export interface DataGridFeatures {
  /** Set `{ manual: true }` for server-side filtering. */
  globalFilter?: boolean | { manual?: boolean };
  /** Set `{ multi: true }` for multi-column sort. */
  sorting?: boolean | { multi?: boolean; manual?: boolean };
  expanding?: boolean;
  columnResizing?: boolean;
  columnPinning?: boolean;
  virtualization?: boolean;
  rowSelection?: boolean | RowSelectionConfig;
  editing?: boolean | EditingConfig;
}

export interface RowSelectionConfig {
  enabled: boolean;
  columnPosition?: "start" | "end";
  pinned?: "left" | "right" | false;
  width?: number;
  enableSelectAll?: boolean;
}

export interface EditingConfig {
  enabled: boolean;
  commitOnBlur?: boolean;
}

export interface VirtualizationConfig {
  /** Default: 40 */
  estimatedRowHeight?: number;
  /** Default: 5 */
  overScan?: number;
}

export interface ExpandableConfig<TData> {
  getSubRows?: (row: TData) => TData[] | undefined;
  renderSubContent?: (row: TData) => ReactNode;
  showExpandToggle?: (row: TData) => boolean;
  showAllExpand?: boolean;
}

export interface GlobalFilterConfig<TData> {
  globalFilterFn?: FilterFn<TData>;
}

export interface TableStateHandlers {
  onGlobalFilterChange?: OnChangeFn<unknown>;
  onSortingChange?: OnChangeFn<SortingState>;
  onExpandedChange?: OnChangeFn<ExpandedState>;
  onColumnSizingChange?: OnChangeFn<ColumnSizingState>;
  onColumnPinningChange?: OnChangeFn<ColumnPinningState>;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
}

export interface DataGridProps<TData = Record<string, unknown>> {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];

  /** Critical for editing and selection to resolve the right row. */
  getRowId?: (row: TData, index: number) => string;

  state?: Partial<TableState>;
  onStateChange?: Partial<TableStateHandlers>;
  initialState?: Partial<TableState>;

  features?: DataGridFeatures;

  expandConfig?: ExpandableConfig<TData>;
  virtualizationConfig?: VirtualizationConfig;
  globalFilterConfig?: GlobalFilterConfig<TData>;

  /** Has no effect unless the `rowSelection` feature is enabled. */
  isRowSelectable?: (row: TData) => boolean;

  /** Independent of per-column `meta.editable` — both must pass for a cell to be editable. */
  isRowEditable?: (row: TData) => boolean;
  onCellEdit?: (event: CellEditEvent<TData>) => void | Promise<void>;
  validateCell?: (value: unknown, row: TData, columnId: string) => string | null | Promise<string | null>;

  onTableReady?: (table: Table<TData>) => void;
  onRowClick?: (row: TData) => void;

  className?: string;
  tableContainerClassName?: string;
  getRowClassName?: (row: TData, depth: number) => string;

  isLoading?: boolean;
  emptyState?: {
    message?: string | ReactNode;
    ctaLabel?: string;
    onCtaClick?: () => void;
    emptySearchMessage?: string | ReactNode;
  };
  errorMessage?: string | ReactNode;
}

export type {
  ColumnDef,
  Cell,
  CellContext,
  TableState,
  ExpandedState,
  SortingState,
  ColumnPinningState,
  ColumnSizingState,
  RowSelectionState,
  Row,
  Table,
  OnChangeFn,
  FilterFn,
} from "@tanstack/react-table";
