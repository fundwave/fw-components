import {
  DataGrid,
  exportGridData,
  useBulkEdit,
  type ColumnDef,
  type Table,
  type CellEditEvent,
} from "@fw-components/data-grid";
import { useState, useMemo, useCallback } from "react";
import { Asset, generateAssets } from "./data";

// ============================================================================
// COLUMN DEFINITIONS
// ============================================================================

const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Realized", label: "Realized" },
  { value: "Written Off", label: "Written Off" },
  { value: "Partially Realized", label: "Partially Realized" },
];

const columns: ColumnDef<Asset, unknown>[] = [
  {
    id: "logo",
    header: "",
    accessorKey: "logo",
    size: 50,
    enableSorting: false,
    enableResizing: false,
    cell: ({ row }) => (
      <img
        src={row.original.logo}
        alt={row.original.name}
        className="w-8 h-8 rounded-full"
      />
    ),
    meta: { width: 50, maxWidth: 50 },
  },
  {
    accessorKey: "name",
    header: "Asset Name",
    size: 180,
    meta: { editable: true, editType: "text", minWidth: 120 },
  },
  {
    accessorKey: "sector",
    header: "Sector",
    size: 140,
    meta: {
      editable: true,
      editType: "select",
      editOptions: [
        { value: "Technology", label: "Technology" },
        { value: "Healthcare", label: "Healthcare" },
        { value: "Finance", label: "Finance" },
        { value: "Energy", label: "Energy" },
        { value: "Real Estate", label: "Real Estate" },
        { value: "Consumer", label: "Consumer" },
        { value: "Industrial", label: "Industrial" },
        { value: "Materials", label: "Materials" },
      ],
    },
  },
  {
    accessorKey: "geography",
    header: "Geography",
    size: 130,
    meta: { editable: true, editType: "text" },
  },
  {
    accessorKey: "investmentDate",
    header: "Investment Date",
    size: 140,
    meta: { formatType: "date", editable: true, editType: "date" },
  },
  {
    accessorKey: "marketValue",
    header: "Market Value",
    size: 140,
    meta: {
      formatType: "currency",
      formatOptions: { currencyCode: "USD" },
      align: "right",
      editable: true,
      editType: "number",
    },
  },
  {
    accessorKey: "costBasis",
    header: "Cost Basis",
    size: 130,
    meta: {
      formatType: "currency",
      formatOptions: { currencyCode: "USD" },
      align: "right",
      editable: true,
      editType: "number",
    },
  },
  {
    accessorKey: "irr",
    header: "IRR",
    size: 90,
    meta: { formatType: "percentage", align: "right", editable: true, editType: "number" },
  },
  {
    accessorKey: "tvpi",
    header: "TVPI",
    size: 80,
    meta: { formatType: "ratio", align: "right", editable: true, editType: "number" },
  },
  {
    accessorKey: "ownership",
    header: "Ownership %",
    size: 110,
    meta: { formatType: "percentage", align: "right", editable: true, editType: "number" },
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 140,
    meta: { editable: true, editType: "select", editOptions: statusOptions },
  },
  {
    accessorKey: "isActive",
    header: "Active",
    size: 70,
    meta: { editable: true, editType: "boolean", align: "center" },
    cell: ({ getValue }) => (
      <span className={`inline-block w-3 h-3 rounded-full ${getValue() ? "bg-green-500" : "bg-gray-300"}`} />
    ),
  },
  {
    accessorKey: "notes",
    header: "Notes",
    size: 160,
    meta: { editable: true, editType: "text" },
  },
  {
    accessorKey: "customField1",
    header: "Custom ID",
    size: 110,
    meta: { editable: true, editType: "text" },
  },
  {
    accessorKey: "customField2",
    header: "Custom Value",
    size: 120,
    meta: { formatType: "number", align: "right", editable: true, editType: "number" },
  },
];

// ============================================================================
// APP COMPONENT
// ============================================================================

export default function App() {
  const [data, setData] = useState<Asset[]>(() => generateAssets(500));
  const [tableInstance, setTableInstance] = useState<Table<Asset> | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [editLog, setEditLog] = useState<string[]>([]);

  // Bulk edit hook
  const bulkEdit = useBulkEdit<Asset>({
    onBulkEdit: async ({ rowIds, columnId, value }) => {
      setData((prev) =>
        prev.map((asset) =>
          rowIds.includes(asset.id) ? { ...asset, [columnId]: value } : asset
        )
      );
      setEditLog((prev) => [
        `Bulk edit: ${rowIds.length} rows, ${columnId} = ${JSON.stringify(value)}`,
        ...prev.slice(0, 9),
      ]);
    },
  });

  // Cell edit handler
  const handleCellEdit = useCallback((event: CellEditEvent<Asset>) => {
    setData((prev) =>
      prev.map((asset) =>
        asset.id === event.rowId
          ? { ...asset, [event.columnId]: event.value }
          : asset
      )
    );
    setEditLog((prev) => [
      `Edit: ${event.rowId} → ${event.columnId} = ${JSON.stringify(event.value)}`,
      ...prev.slice(0, 9),
    ]);
  }, []);

  // Validation
  const validateCell = useCallback((value: unknown, _row: Asset, columnId: string) => {
    if (columnId === "name" && (!value || String(value).trim() === "")) {
      return "Asset name is required";
    }
    if (columnId === "marketValue" && typeof value === "number" && value < 0) {
      return "Market value cannot be negative";
    }
    return null;
  }, []);

  // Export handlers
  const handleExportCSV = () => {
    if (!tableInstance) return;
    exportGridData(tableInstance, {
      filename: "portfolio-assets",
      sheetName: "Assets",
    });
  };

  const handleExportSelected = () => {
    if (!tableInstance) return;
    exportGridData(tableInstance, {
      filename: "selected-assets",
      selectedOnly: true,
    });
  };

  const handleExportCustom = () => {
    if (!tableInstance) return;
    exportGridData(tableInstance, {
      filename: "custom-export",
      onExport: (exportData) => {
        // Custom handler — just log it (in real app, could use SheetJS)
        const preview = JSON.stringify(exportData.rows.slice(0, 3), null, 2);
        alert(`Custom export handler!\n\nHeaders: ${exportData.headers.join(", ")}\n\nFirst 3 rows:\n${preview}`);
      },
    });
  };

  // Bulk edit actions
  const handleBulkEditStatus = () => {
    if (!tableInstance) return;
    const selectedRows = tableInstance.getSelectedRowModel().rows;
    if (selectedRows.length === 0) {
      alert("Select rows first (using checkboxes)");
      return;
    }
    bulkEdit.startBulkEdit("status");
    bulkEdit.updateBulkValue("Realized");
    const rowIds = selectedRows.map((r) => r.id);
    const rows = selectedRows.map((r) => r.original);
    bulkEdit.commitBulkEdit(rowIds, rows);
  };

  // Stats
  const stats = useMemo(() => {
    const totalValue = data.reduce((sum, a) => sum + a.marketValue, 0);
    const avgIRR = data.reduce((sum, a) => sum + a.irr, 0) / data.length;
    return { totalValue, avgIRR, count: data.length };
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="max-w-[1800px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              @fw-components/data-grid — Showcase
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Portfolio Dashboard with {stats.count} assets • Total Value: ${(stats.totalValue / 1_000_000).toFixed(0)}M • Avg IRR: {(stats.avgIRR * 100).toFixed(1)}%
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
              Virtualized
            </span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
              Editable
            </span>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
              Range Select
            </span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="flex-1 min-w-[200px] max-w-[300px]">
              <input
                type="text"
                placeholder="Search assets..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="h-6 w-px bg-gray-200" />

            {/* Export buttons */}
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 text-xs font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              📥 Export CSV
            </button>
            <button
              onClick={handleExportSelected}
              className="px-3 py-2 text-xs font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              📋 Export Selected
            </button>
            <button
              onClick={handleExportCustom}
              className="px-3 py-2 text-xs font-medium bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              ⚙️ Custom Export
            </button>

            <div className="h-6 w-px bg-gray-200" />

            {/* Bulk edit */}
            <button
              onClick={handleBulkEditStatus}
              className="px-3 py-2 text-xs font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              ✏️ Bulk Set Status → Realized
            </button>

            <div className="h-6 w-px bg-gray-200" />

            {/* Row count control */}
            <select
              className="px-2 py-2 text-xs border border-gray-300 rounded-md"
              defaultValue="500"
              onChange={(e) => setData(generateAssets(Number(e.target.value)))}
            >
              <option value="50">50 rows</option>
              <option value="100">100 rows</option>
              <option value="500">500 rows</option>
              <option value="1000">1,000 rows</option>
              <option value="5000">5,000 rows</option>
              <option value="10000">10,000 rows</option>
            </select>

            {/* Range selection info */}
          </div>
        </div>

        {/* Data Grid */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <DataGrid<Asset>
            data={data}
            columns={columns}
            getRowId={(row) => row.id}
            features={{
              virtualization: true,
              sorting: { multi: true },
              globalFilter: true,
              columnResizing: true,
              columnPinning: true,
              rowSelection: { enabled: true, pinned: "left", width: 36 },
              editing: { enabled: true, mode: "cell", commitOnBlur: true },
              rangeSelection: true,
            }}
            state={{ globalFilter }}
            onStateChange={{ onGlobalFilterChange: setGlobalFilter as (value: unknown) => void }}
            virtualizationConfig={{ estimatedRowHeight: 44, overScan: 10 }}
            onCellEdit={handleCellEdit}
            validateCell={validateCell}
            onTableReady={setTableInstance}
            onRowClick={(row) => console.log("Row clicked:", row.name)}
            onInteraction={(event, props) => console.log("Interaction:", event, props)}
            tableContainerClassName="h-[65vh]"
            className="w-full"
            emptyState={{
              message: "No assets in portfolio",
              ctaLabel: "Add Asset",
              onCtaClick: () => alert("Add asset clicked!"),
              emptySearchMessage: "No assets match your search",
            }}
          />
        </div>

        {/* Feature Guide & Edit Log */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Feature Guide */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">🎯 Feature Guide</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 px-1 rounded">Click cell</span>
                <span>Edit any highlighted cell (text, number, date, select, boolean)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 px-1 rounded">Enter/Esc</span>
                <span>Commit / Cancel edit</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 px-1 rounded">☑️ Checkbox</span>
                <span>Select rows for bulk operations or export</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 px-1 rounded">Shift+Click</span>
                <span>Range select cells (Excel-like)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 px-1 rounded">Shift+Arrow</span>
                <span>Extend selection with keyboard</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 px-1 rounded">Ctrl+A</span>
                <span>Select all cells</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 px-1 rounded">Column header</span>
                <span>Click to sort, drag edge to resize</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 px-1 rounded">Search</span>
                <span>Type to filter across all columns instantly</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-mono bg-gray-100 px-1 rounded">Scroll</span>
                <span>Virtualized — only visible rows render (try 10,000 rows!)</span>
              </div>
            </div>
          </div>

          {/* Edit Log */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">📝 Edit Log</h3>
            <div className="space-y-1 text-xs font-mono text-gray-600 max-h-[200px] overflow-auto">
              {editLog.length === 0 ? (
                <p className="text-gray-400 italic">Edit a cell to see changes here...</p>
              ) : (
                editLog.map((log, i) => (
                  <div key={i} className="py-1 border-b border-gray-50">
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs text-gray-400">
          Built with @fw-components/data-grid • TanStack Table • TanStack Virtual • React
        </div>
      </div>
    </div>
  );
}
