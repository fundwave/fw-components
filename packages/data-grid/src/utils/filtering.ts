import type { Row } from "@tanstack/react-table";

// ============================================================================
// TEXT NORMALIZATION
// ============================================================================

/**
 * Normalize a string for fuzzy search: lowercase, remove accents, normalize whitespace
 */
export const normalize = (str: string): string =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// ============================================================================
// SEARCH INDEX
// ============================================================================

/**
 * Pre-builds a search index for each row by concatenating all primitive values.
 * Attaches `__searchTerm` to each row for fast global filter matching.
 */
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

// ============================================================================
// GLOBAL FILTER FUNCTIONS
// ============================================================================

function getRowValues<TData>(row: Row<TData>): string {
  return row
    .getAllCells()
    .map((cell) => String(cell.getValue() ?? ""))
    .join(" ")
    .toLowerCase();
}

/**
 * A tree-aware global filter that matches rows, their parents, and their children.
 * Works with the pre-built search index for performance.
 */
export function treeAwareGlobalFilterFn<TData>(
  row: Row<TData & { __searchTerm?: string }>,
  _columnId: string,
  filterValue: unknown
): boolean {
  if (!filterValue) return true;

  const query = normalize(String(filterValue));

  // Self match
  const rowValues = row.original.__searchTerm || getRowValues(row);
  if (rowValues.includes(query)) return true;

  // Parent match (show children when parent matches)
  let parent = row.getParentRow();
  while (parent) {
    const parentValues = (parent.original as { __searchTerm?: string }).__searchTerm || getRowValues(parent);
    if (parentValues.includes(query)) return true;
    parent = parent.getParentRow();
  }

  return false;
}
