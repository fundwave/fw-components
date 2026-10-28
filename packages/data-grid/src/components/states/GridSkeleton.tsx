import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { cn, getAlignmentClasses } from "../../utils/styling";

export interface GridSkeletonProps {
  columns: ColumnDef<unknown, unknown>[];
  rowCount?: number;
  showExpand?: boolean;
}

export const GridSkeleton: React.FC<GridSkeletonProps> = ({ columns, rowCount = 5, showExpand = false }) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIdx) => (
        <tr key={`skeleton-${rowIdx}`} className="fwgrid:border-b fwgrid:border-gray-100">
          {columns.map((col, colIdx) => {
            const columnMeta = col.meta || {};
            const { justifyContent } = getAlignmentClasses(columnMeta?.align || "left");

            return (
              <td key={`skeleton-cell-${rowIdx}-${colIdx}`} className="fwgrid:px-3 fwgrid:py-3">
                <div className={cn("fwgrid:flex fwgrid:items-center fwgrid:gap-2", justifyContent)}>
                  {colIdx === 0 && showExpand && (
                    <div className="fwgrid:bg-gray-200 fwgrid:animate-pulse fwgrid:rounded fwgrid:h-3.5 fwgrid:w-3.5" />
                  )}
                  <div
                    className={cn(
                      "fwgrid:bg-gray-200 fwgrid:animate-pulse fwgrid:rounded fwgrid:h-4",
                      colIdx === 0 ? "fwgrid:w-7/12" : "fwgrid:w-3/5"
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
