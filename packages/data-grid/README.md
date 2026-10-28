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

### Styling

The package ships a pre-built, ready-to-use stylesheet, you don't need Tailwind in your own app to use it. All utility classes emitted by these components are namespaced with the `fwgrid:` prefix (e.g. `fwgrid:flex`, `fwgrid:bg-blue-600`), so they can't collide with your app's own Tailwind (or other) classes, and only the classes actually used by the grid are included in the build. There are two ways to bring the stylesheet into your app.

#### Option 1: CSS file import (regular DOM)

For a normal (non-shadow-root) app, import the CSS file once in your app entry point and let your bundler emit it as a `<link>`/inlined `<style>` the usual way:

```ts
import "@fw-components/data-grid/styles.css";
```

#### Option 2: CSS-as-string import (Shadow DOM / dynamic injection)

If your app (or the part of it rendering the grid) lives inside a shadow root, a plain `<link>`/global `<style>` tag won't reach it. For that case (or any other scenario where you need the CSS as a JS string rather than a file path, e.g. your own build pipeline can't process the pre-compiled CSS file as-is), the same compiled output is also published as a JS module:

```ts
import { styles } from "@fw-components/data-grid/styles";

const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);
shadowRoot.adoptedStyleSheets = [sheet];
```

Or, without constructable stylesheets support, inject it as an inline `<style>` tag:

```ts
import { styles } from "@fw-components/data-grid/styles";

const styleTag = document.createElement("style");
styleTag.textContent = styles;
document.head.appendChild(styleTag);
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

Enable row selection, then commit an edit via `onCellEdit` for any row that's part of the
current selection to apply it across all selected rows:

```tsx
function PortfolioDashboard() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCellEdit = async ({ rowId, columnId, value, row }: CellEditEvent<Asset>) => {
    const isBulkTarget = selectedIds.length > 1 && selectedIds.includes(rowId);
    const targetIds = isBulkTarget ? selectedIds : [rowId];
    await Promise.all(targetIds.map((id) => api.updateAsset(id, { [columnId]: value })));
  };

  return (
    <DataGrid
      data={assets}
      columns={columns}
      getRowId={(row) => row.id}
      features={{ rowSelection: true, editing: true }}
      onCellEdit={handleCellEdit}
      onStateChange={{ onRowSelectionChange: setSelectedIds }}
    />
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
| `validateCell` | `(value, row, colId) => string \| null` | Cell validation |
| `onTableReady` | `(table) => void` | TanStack Table instance callback |
| `onRowClick` | `(row) => void` | Row click handler |
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

#### `useDataGridState(options)`

Central state management with controlled/uncontrolled support.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Enter` / `F2` | Start editing cell |
| `Enter` | Commit edit |
| `Escape` | Cancel edit |
| `Tab` | Move to next cell (when editing) |
| `Space` | Toggle checkbox / expand row |

## Showcase / Demo

Run the interactive showcase to try all features:

```bash
cd showcase/data-grid
npm install
npm run dev
```

Open http://localhost:5173 to see the portfolio dashboard demo with 500+ assets,
editable columns, virtualization, and more.

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 15+

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.
