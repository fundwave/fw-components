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

// ============================================================================
// COLUMN META TYPE AUGMENTATION
// ============================================================================

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    /** Column format type for automatic formatting */
    formatType?: ValueFormatType;
    /** Format options (decimals, currency code, date format, etc.) */
    formatOptions?: FormatOptions;
    /** Custom format function — takes precedence over formatType */
    formatFn?: (value: TValue, cell: CellContext<TData, TValue>) => string | number | ReactNode;
    /** Text alignment within the column */
    align?: "left" | "center" | "right";
    /** Column width (px or CSS value) */
    width?: string | number;
    /** Maximum column width */
    maxWidth?: string | number;
    /** Minimum column width */
    minWidth?: string | number;
    /** Custom CSS class for the header cell */
    headerClassName?: string;
    /** Custom CSS class for data cells */
    cellClassName?: string;
    /** Whether this column is editable */
    editable?: boolean;
    /** Editor type for this column */
    editType?: CellEditType;
    /** Options for select-type editors */
    editOptions?: SelectOption[];
    /** Validation function for edits */
    validate?: (value: unknown, row: TData) => string | null | Promise<string | null>;
    /** Custom edit cell renderer */
    editCell?: (props: EditCellRenderProps<TData, TValue>) => ReactNode;
  }
}

// ============================================================================
// VALUE FORMAT TYPES
// ============================================================================

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

export type FormatOptions = {
  currencyCode?: string | null;
  numberFormat?: "000s" | "Millions" | null;
  decimals?: number | null;
  dateFormat?: string | null;
  formatAsUTC?: boolean | null;
  trim?: boolean | null;
  placeholder?: string;
};

// ============================================================================
// EDITING TYPES
// ============================================================================

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

export interface BulkEditEvent<TData = unknown> {
  rowIds: string[];
  columnId: string;
  value: unknown;
  rows: TData[];
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
  /** Currently edited cell: { rowId, columnId } */
  editingCell: { rowId: string; columnId: string } | null;
  /** Draft values keyed by "rowId:columnId" */
  drafts: Record<string, unknown>;
  /** Validation errors keyed by "rowId:columnId" */
  errors: Record<string, string>;
  /** Cells with uncommitted changes */
  dirtyCells: Set<string>;
}

// ============================================================================
// FEATURE CONFIGURATION
// ============================================================================

export interface DataGridFeatures {
  /** Enable global text search. Set `{ manual: true }` for server-side filtering. */
  globalFilter?: boolean | { manual?: boolean };
  /** Enable column sorting. Set `{ multi: true }` for multi-column sort. */
  sorting?: boolean | { multi?: boolean; manual?: boolean };
  /** Enable row expansion for hierarchical data */
  expanding?: boolean;
  /** Enable column resize by dragging */
  columnResizing?: boolean;
  /** Enable column pinning (left/right) */
  columnPinning?: boolean;
  /** Enable row virtualization for performance with large datasets */
  virtualization?: boolean;
  /** Enable row selection with checkboxes */
  rowSelection?: boolean | RowSelectionConfig;
  /** Enable cell editing */
  editing?: boolean | EditingConfig;
  /** Enable Excel-like range selection (cell/row/column ranges via Shift+Click, Shift+Arrow, Ctrl+Click) */
  rangeSelection?: boolean;
}

export interface RowSelectionConfig {
  enabled: boolean;
  /** Position of the checkbox column */
  columnPosition?: "start" | "end";
  /** Pin the selection column */
  pinned?: "left" | "right" | false;
  /** Width of selection column in px */
  width?: number;
  /** Allow selecting all rows via header checkbox */
  enableSelectAll?: boolean;
}

export interface EditingConfig {
  enabled: boolean;
  /** Edit mode: "cell" edits one at a time, "bulk" enables multi-row editing */
  mode?: "cell" | "bulk";
  /** Whether to commit on blur */
  commitOnBlur?: boolean;
  /** Whether to show a save/cancel toolbar during bulk edit */
  showBulkToolbar?: boolean;
}

export interface VirtualizationConfig {
  /** Estimated height of each row in pixels (default: 40) */
  estimatedRowHeight?: number;
  /** Number of rows to render outside the visible area (default: 5) */
  overScan?: number;
}

export interface ExpandableConfig<TData> {
  /** Function to get sub-rows for hierarchical data */
  getSubRows?: (row: TData) => TData[] | undefined;
  /** Render custom content below an expanded row */
  renderSubContent?: (row: TData) => ReactNode;
  /** Control which rows show the expand toggle */
  showExpandToggle?: (row: TData) => boolean;
  /** Show "expand all" toggle in the header */
  showAllExpand?: boolean;
}

export interface GlobalFilterConfig<TData> {
  /** Custom global filter function */
  globalFilterFn?: FilterFn<TData>;
}

// ============================================================================
// STATE HANDLER TYPES
// ============================================================================

export interface TableStateHandlers {
  onGlobalFilterChange?: OnChangeFn<unknown>;
  onSortingChange?: OnChangeFn<SortingState>;
  onExpandedChange?: OnChangeFn<ExpandedState>;
  onColumnSizingChange?: OnChangeFn<ColumnSizingState>;
  onColumnPinningChange?: OnChangeFn<ColumnPinningState>;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
}

// ============================================================================
// INTERACTION CALLBACK
// ============================================================================

export type InteractionType =
  | "sorting"
  | "filtering"
  | "expanding"
  | "resizing"
  | "pinning"
  | "rowClick"
  | "cellEdit"
  | "bulkEdit"
  | "rowSelect";

export type OnInteractionCallback = (
  eventName: string,
  properties?: { label?: string; type: InteractionType }
) => void;

// ============================================================================
// DATA GRID PROPS
// ============================================================================

export interface DataGridProps<TData = Record<string, unknown>> {
  // --- Required ---
  /** Column definitions using TanStack Table ColumnDef */
  columns: ColumnDef<TData, unknown>[];
  /** Data array to render in the grid */
  data: TData[];

  // --- Row Identity ---
  /** Function to derive a stable, unique ID for each row. Critical for editing and selection. */
  getRowId?: (row: TData, index: number) => string;

  // --- State (Controlled) ---
  /** Controlled table state (partial) */
  state?: Partial<TableState>;
  /** State change handlers */
  onStateChange?: Partial<TableStateHandlers>;
  /** Initial state values */
  initialState?: Partial<TableState>;

  // --- Features ---
  /** Enable/disable grid features */
  features?: DataGridFeatures;

  // --- Feature Configs ---
  /** Configuration for row expanding */
  expandConfig?: ExpandableConfig<TData>;
  /** Configuration for virtualization */
  virtualizationConfig?: VirtualizationConfig;
  /** Configuration for global filter */
  globalFilterConfig?: GlobalFilterConfig<TData>;

  // --- Editing Callbacks ---
  /** Called when a single cell value is committed */
  onCellEdit?: (event: CellEditEvent<TData>) => void | Promise<void>;
  /** Called when bulk edit is committed */
  onBulkEdit?: (event: BulkEditEvent<TData>) => void | Promise<void>;
  /** Validate a cell value before committing */
  validateCell?: (value: unknown, row: TData, columnId: string) => string | null | Promise<string | null>;

  // --- Interactions ---
  /** Called when the TanStack Table instance is ready */
  onTableReady?: (table: Table<TData>) => void;
  /** Generic interaction tracking callback */
  onInteraction?: OnInteractionCallback;
  /** Called when a row is clicked */
  onRowClick?: (row: TData) => void;

  // --- Styling ---
  /** CSS class for the outer wrapper */
  className?: string;
  /** CSS class for the scrollable table container */
  tableContainerClassName?: string;
  /** Dynamic row class based on row data */
  getRowClassName?: (row: TData, depth: number) => string;

  // --- Loading & Empty States ---
  /** Show loading indicator */
  isLoading?: boolean;
  /** Empty state configuration */
  emptyState?: {
    message?: string | ReactNode;
    ctaLabel?: string;
    onCtaClick?: () => void;
    emptySearchMessage?: string | ReactNode;
  };
  /** Error message to display */
  errorMessage?: string | ReactNode;
}

// ============================================================================
// RE-EXPORTS FROM TANSTACK
// ============================================================================

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
