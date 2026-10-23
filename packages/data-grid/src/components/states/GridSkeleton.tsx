import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { cn, getAlignmentClasses } from "../../utils/styling";

export interface GridSkeletonProps {
  columns: ColumnDef<unknown, unknown>[];
  rowCount?: number;
  showExpand?: boolean;
}

/**
 * Skeleton loading state with animated placeholders.
 */
export const GridSkeleton: React.FC<GridSkeletonProps> = ({ columns, rowCount = 5, showExpand = false }) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIdx) => (
        <tr key={`skeleton-${rowIdx}`} className="border-b border-gray-100">
          {columns.map((col, colIdx) => {
            const columnMeta = col.meta || {};
            const { justifyContent } = getAlignmentClasses(columnMeta?.align || "left");

            return (
              <td key={`skeleton-cell-${rowIdx}-${colIdx}`} className="px-3 py-3">
                <div className={cn("flex items-center gap-2", justifyContent)}>
                  {colIdx === 0 && showExpand && (
                    <div className="bg-gray-200 animate-pulse rounded h-3.5 w-3.5" />
                  )}
                  <div
                    className={cn(
                      "bg-gray-200 animate-pulse rounded h-4",
                      colIdx === 0 ? "w-7/12" : "w-3/5"
                    )}
                  />
                </div>
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
};
