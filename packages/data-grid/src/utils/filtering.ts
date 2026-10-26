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
  return row
    .getAllCells()
    .map((cell) => String(cell.getValue() ?? ""))
    .join(" ")
    .toLowerCase();
}

export function treeAwareGlobalFilterFn<TData>(
  row: Row<TData & { __searchTerm?: string }>,
  _columnId: string,
  filterValue: unknown
): boolean {
  if (!filterValue) return true;

  const query = normalize(String(filterValue));

  const rowValues = row.original.__searchTerm || getRowValues(row);
  if (rowValues.includes(query)) return true;

  let parent = row.getParentRow();
  while (parent) {
    const parentValues = (parent.original as { __searchTerm?: string }).__searchTerm || getRowValues(parent);
    if (parentValues.includes(query)) return true;
    parent = parent.getParentRow();
  }

  return false;
}
