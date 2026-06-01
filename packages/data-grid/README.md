# @fw-components/data-grid

A high-performance, editable data grid for React with built-in virtualization, sorting, filtering, column management, and bulk editing. Built on [TanStack Table](https://tanstack.com/table) and [TanStack Virtual](https://tanstack.com/virtual).

## Features

- 🚀 **Virtualized rendering** — handles thousands of rows with smooth scrolling
- ✏️ **Cell editing** — click-to-edit with text, number, date, select, and boolean editors
- 📋 **Bulk editing** — select multiple rows and edit a field across all of them
- 🔍 **Global search** — instant text filtering with tree-aware matching
- ↕️ **Sorting** — single and multi-column sorting
- 📌 **Column pinning** — pin columns to left or right
- ↔️ **Column resizing** — drag to resize columns
- 🌲 **Row expansion** — hierarchical/nested data with custom sub-content
- ☑️ **Row selection** — checkbox selection with select-all
- 🎨 **Customizable** — custom cell renderers, edit components, and styling
- ♿ **Accessible** — proper ARIA roles, keyboard navigation
- 📦 **Zero runtime deps** — only React and TanStack as peer dependencies

## Installation

```bash
npm install @fw-components/data-grid @tanstack/react-table @tanstack/react-virtual
```

### Peer Dependencies

```json
{
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0",
  "@tanstack/react-table": "^8.0.0",
  "@tanstack/react-virtual": "^3.0.0"
}
```

### Tailwind CSS Setup

This package uses Tailwind CSS utility classes. Add the package to your Tailwind `content` configuration:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@fw-components/data-grid/dist/**/*.js", // Add this line
  ],
};
```

## Quick Start

```tsx
import { DataGrid } from "@fw-components/data-grid";
import type { ColumnDef } from "@fw-components/data-grid";

interface Asset {
  id: string;
  name: string;
  sector: string;
  value: number;
  irr: number;
}

const columns: ColumnDef<Asset>[] = [
  { accessorKey: "name", header: "Asset Name" },
  { accessorKey: "sector", header: "Sector" },
  {
    accessorKey: "value",
    header: "Value",
    meta: { formatType: "currency", formatOptions: { currencyCode: "USD" }, align: "right" },
  },
  {
    accessorKey: "irr",
    header: "IRR",
    meta: { formatType: "percentage", align: "right" },
  },
];

function PortfolioDashboard() {
  return (
    <DataGrid
      data={assets}
      columns={columns}
      getRowId={(row) => row.id}
      features={{ virtualization: true, sorting: true }}
      tableContainerClassName="h-[600px]"
    />
  );
}
```

## Editing

### Cell Editing

Enable editing on specific columns via `meta.editable` and `meta.editType`:

```tsx
const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "name",
    header: "Asset Name",
    meta: { editable: true, editType: "text" },
  },
  {
    accessorKey: "sector",
    header: "Sector",
    meta: {
      editable: true,
      editType: "select",
      editOptions: [
        { value: "tech", label: "Technology" },
        { value: "health", label: "Healthcare" },
        { value: "finance", label: "Finance" },
      ],
    },
  },
  {
    accessorKey: "value",
    header: "Value",
    meta: { editable: true, editType: "number" },
  },
  {
    accessorKey: "investmentDate",
    header: "Date",
    meta: { editable: true, editType: "date" },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    meta: { editable: true, editType: "boolean" },
  },
];

<DataGrid
  data={assets}
  columns={columns}
  getRowId={(row) => row.id}
  features={{ editing: true }}
  onCellEdit={async ({ rowId, columnId, value }) => {
    await api.updateAsset(rowId, { [columnId]: value });
  }}
  validateCell={(value, row, columnId) => {
    if (columnId === "name" && !value) return "Name is required";
    return null;
  }}
/>;
```

### Custom Edit Components

For complex editors (e.g., entity pickers, async selects), use `meta.editCell`:

```tsx
{
  accessorKey: "assignee",
  header: "Assignee",
  meta: {
    editable: true,
    editType: "custom",
    editCell: ({ value, onChange, onCommit, onCancel, error }) => (
      <UserPicker
        value={value}
        onChange={onChange}
        onSelect={(user) => { onChange(user); onCommit(); }}
        onCancel={onCancel}
        error={error}
      />
    ),
  },
}
```

### Bulk Editing

Enable row selection + bulk editing to edit multiple rows at once:

```tsx
import { DataGrid, useBulkEdit } from "@fw-components/data-grid";
import type { Table } from "@fw-components/data-grid";

function PortfolioDashboard() {
  const [tableRef, setTableRef] = useState<Table<Asset> | null>(null);

  const bulkEdit = useBulkEdit<Asset>({
    onBulkEdit: async ({ rowIds, columnId, value }) => {
      await api.bulkUpdateAssets(rowIds, { [columnId]: value });
    },
  });

  const handleBulkEdit = () => {
    if (!tableRef) return;
    const selectedRows = tableRef.getSelectedRowModel().rows;
    const rowIds = selectedRows.map((r) => r.id);
    const rows = selectedRows.map((r) => r.original);
    bulkEdit.commitBulkEdit(rowIds, rows);
  };

  return (
    <div>
      <DataGrid
        data={assets}
        columns={columns}
        getRowId={(row) => row.id}
        features={{ rowSelection: true, editing: true }}
        onTableReady={setTableRef}
      />
      {bulkEdit.isBulkEditing && (
        <BulkEditToolbar
          onSave={handleBulkEdit}
          onCancel={bulkEdit.cancelBulkEdit}
        />
      )}
    </div>
  );
}
```

## Row Selection

```tsx
<DataGrid
  data={assets}
  columns={columns}
  getRowId={(row) => row.id}
  features={{
    rowSelection: {
      enabled: true,
      columnPosition: "start",
      pinned: "left",
      width: 40,
      enableSelectAll: true,
    },
  }}
  onStateChange={{
    onRowSelectionChange: (selection) => console.log("Selected:", selection),
  }}
/>
```

## Virtualization

Virtualization is enabled by default. For best performance with large datasets:

```tsx
<DataGrid
  data={largeDataset} // 10,000+ rows
  columns={columns}
  getRowId={(row) => row.id}
  features={{ virtualization: true }}
  virtualizationConfig={{
    estimatedRowHeight: 48, // Helps virtualizer estimate scroll size
    overScan: 10,           // Extra rows rendered outside viewport
  }}
  tableContainerClassName="h-[80vh]" // Container must have a fixed height!
/>
```

> ⚠️ **Important**: The table container must have a fixed height (via className or style) for virtualization to work.

## Column Formatting

Built-in formatters for financial data:

```tsx
const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "marketValue",
    header: "Market Value",
    meta: {
      formatType: "currency",
      formatOptions: { currencyCode: "USD", numberFormat: "Millions", decimals: 1 },
      align: "right",
    },
  },
  {
    accessorKey: "irr",
    header: "IRR",
    meta: { formatType: "percentage", formatOptions: { decimals: 2 } },
  },
  {
    accessorKey: "multiple",
    header: "TVPI",
    meta: { formatType: "ratio" },
  },
  {
    accessorKey: "investmentDate",
    header: "Investment Date",
    meta: { formatType: "date", formatOptions: { dateFormat: "MMM DD, YYYY" } },
  },
];
```

Available format types: `currency`, `percentage`, `decimal`, `number`, `text`, `date`, `ratio`, `boolean`

### Custom Format Function

```tsx
{
  accessorKey: "logoUrl",
  header: "Logo",
  meta: {
    formatFn: (value) => <img src={value} className="w-8 h-8 rounded" alt="" />,
  },
}
```

## API Reference

### `<DataGrid>` Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `TData[]` | **Required.** Array of row data |
| `columns` | `ColumnDef<TData>[]` | **Required.** Column definitions |
| `getRowId` | `(row, index) => string` | Stable row ID function (critical for editing/selection) |
| `features` | `DataGridFeatures` | Enable/disable features |
| `state` | `Partial<TableState>` | Controlled state |
| `onStateChange` | `TableStateHandlers` | State change callbacks |
| `initialState` | `Partial<TableState>` | Initial state values |
| `onCellEdit` | `(event) => void` | Cell edit commit handler |
| `onBulkEdit` | `(event) => void` | Bulk edit commit handler |
| `validateCell` | `(value, row, colId) => string \| null` | Cell validation |
| `onTableReady` | `(table) => void` | TanStack Table instance callback |
| `onRowClick` | `(row) => void` | Row click handler |
| `onInteraction` | `(event, props) => void` | Analytics/tracking callback |
| `isLoading` | `boolean` | Show loading state |
| `emptyState` | `object` | Empty state configuration |
| `errorMessage` | `ReactNode` | Error state message |
| `className` | `string` | Outer wrapper class |
| `tableContainerClassName` | `string` | Scroll container class |
| `getRowClassName` | `(row, depth) => string` | Dynamic row styling |

### `DataGridFeatures`

```ts
interface DataGridFeatures {
  globalFilter?: boolean | { manual?: boolean };
  sorting?: boolean | { multi?: boolean; manual?: boolean };
  expanding?: boolean;
  columnResizing?: boolean;
  columnPinning?: boolean;
  virtualization?: boolean;
  rowSelection?: boolean | RowSelectionConfig;
  editing?: boolean | EditingConfig;
  rangeSelection?: boolean;
}
```

### Column Meta

Extend column definitions with `meta`:

```ts
{
  editable?: boolean;
  editType?: "text" | "number" | "date" | "select" | "boolean" | "custom";
  editOptions?: { value: string; label: string }[];
  editCell?: (props: EditCellRenderProps) => ReactNode;
  validate?: (value, row) => string | null;
  formatType?: "currency" | "percentage" | "decimal" | "number" | "text" | "date" | "ratio" | "boolean";
  formatOptions?: FormatOptions;
  formatFn?: (value, cell) => ReactNode;
  align?: "left" | "center" | "right";
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  headerClassName?: string;
  cellClassName?: string;
}
```

### Hooks

#### `useEditing(options)`

Manages cell-level editing state. Stores drafts outside cell components for virtualization safety.

#### `useBulkEdit(options)`

Manages bulk editing operations across multiple selected rows.

#### `useRangeSelection(options)`

Excel-like cell/row/column range selection. See [Range Selection](#range-selection) section.

#### `useDataGridState(options)`

Central state management with controlled/uncontrolled support.

## Range Selection

Enable Excel-like range selection with `useRangeSelection`:

```tsx
import { DataGrid, useRangeSelection } from "@fw-components/data-grid";

function MyGrid() {
  const rangeSelection = useRangeSelection({
    rowCount: data.length,
    columnCount: columns.length,
    skipColumns: [0], // skip checkbox column
    onSelectionChange: (state) => {
      console.log("Selected ranges:", state.ranges);
    },
  });

  return (
    <div
      onKeyDown={rangeSelection.handleKeyDown}
      onMouseUp={rangeSelection.handleMouseUp}
      tabIndex={0}
    >
      <DataGrid
        data={data}
        columns={columns}
        features={{ rangeSelection: true }}
      />
    </div>
  );
}
```

**Supported interactions:**
- **Click** — select single cell
- **Shift+Click** — extend selection from active cell
- **Ctrl/Cmd+Click** — add another range (multi-select)
- **Click+Drag** — select a rectangular range
- **Shift+Arrow** — extend selection with keyboard
- **Ctrl+A** — select all cells
- **`selectRow(index)`** — select entire row
- **`selectColumn(index)`** — select entire column

## Export to Excel

Export grid data with the built-in `exportGridData` utility:

```tsx
import { DataGrid, exportGridData, type Table } from "@fw-components/data-grid";

function MyGrid() {
  const [table, setTable] = useState<Table<Asset> | null>(null);

  // Default: downloads as CSV
  const handleExport = () => {
    exportGridData(table!, { filename: "portfolio-assets" });
  };

  // Export only selected rows
  const handleExportSelected = () => {
    exportGridData(table!, { filename: "selected", selectedOnly: true });
  };

  // Custom export handler (e.g., using SheetJS/xlsx library)
  const handleExportXLSX = () => {
    exportGridData(table!, {
      filename: "portfolio",
      onExport: (data) => {
        // data.headers: string[]
        // data.rows: (string | number | boolean | null)[][]
        // Use SheetJS, ExcelJS, or any library here
        const ws = XLSX.utils.aoa_to_sheet([data.headers, ...data.rows]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, data.sheetName);
        XLSX.writeFile(wb, `${data.filename}.xlsx`);
      },
    });
  };

  return (
    <>
      <button onClick={handleExport}>Export CSV</button>
      <button onClick={handleExportSelected}>Export Selected</button>
      <button onClick={handleExportXLSX}>Export XLSX</button>
      <DataGrid data={data} columns={columns} onTableReady={setTable} />
    </>
  );
}
```

**Export options:**

| Option | Type | Description |
|--------|------|-------------|
| `filename` | `string` | File name without extension |
| `sheetName` | `string` | Sheet name (default: "Sheet1") |
| `columns` | `ExportColumn[]` | Override which columns to export |
| `selectedOnly` | `boolean` | Export only selected rows |
| `includeHeaders` | `boolean` | Include header row (default: true) |
| `onExport` | `(data) => void` | Custom handler — receives prepared data |

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` / `F2` | Start editing cell |
| `Enter` | Commit edit |
| `Escape` | Cancel edit |
| `Tab` | Move to next cell (when editing) |
| `Space` | Toggle checkbox / expand row |
| `Shift+Arrow` | Extend range selection |
| `Ctrl+A` | Select all cells |
| `Home` / `End` | Jump to first/last column |
| `Ctrl+Home/End` | Jump to first/last cell in grid |

## Showcase / Demo

Run the interactive showcase to try all features:

```bash
cd showcase/data-grid
npm install
npm run dev
```

Open http://localhost:5173 to see the portfolio dashboard demo with 500+ assets,
editable columns, range selection, export, virtualization, and more.

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 15+

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](./LICENSE)
