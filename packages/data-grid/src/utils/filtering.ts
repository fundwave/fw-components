import type { Row } from "@tanstack/react-table";

export const normalize = (str: string): string =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function buildSearchIndex<T>(
  rows: T[]
): (T & { __searchTerm: string })[] {
  return rows.map((row) => {
    const { subRows, id, ...rest } = row as Record<string, unknown>;

    const searchTerm = normalize(
      Object.values(rest)
        .filter((value) => value !== undefined && value !== null && typeof value !== "object")
        .join(" ")
    );

    return {
      ...row,
      __searchTerm: searchTerm,
      subRows: subRows ? buildSearchIndex(subRows as Record<string, unknown>[]) : undefined,
    } as T & { __searchTerm: string };
  });
}

function getRowValues<TData>(row: Row<TData>): string {
  return normalize(
    row
      .getAllCells()
      .map((cell) => {
        const searchValue = cell.column.columnDef.meta?.getSearchValue?.(cell.getValue(), row.original);
        return String(searchValue ?? cell.getValue() ?? "");
      })
      .join(" ")
  );
}

function matchesRow<TData>(row: Row<TData & { __searchTerm?: string }>, query: string): boolean {
  if (row.original.__searchTerm?.includes(query)) return true;
  // The raw-data index misses nested/computed accessor columns, so also check resolved
  // cell values.
  return getRowValues(row).includes(query);
}

export function treeAwareGlobalFilterFn<TData>(
  row: Row<TData & { __searchTerm?: string }>,
  _columnId: string,
  filterValue: unknown
): boolean {
  if (!filterValue) return true;

  const query = normalize(String(filterValue));

  if (matchesRow(row, query)) return true;

  let parent = row.getParentRow();
  while (parent) {
    if (matchesRow(parent, query)) return true;
    parent = parent.getParentRow();
  }

  return false;
}
