import React from "react";

export interface GridErrorStateProps {
  error: string | React.ReactNode;
  columnCount: number;
}

/**
 * Error state shown when the grid encounters an error.
 */
export const GridErrorState: React.FC<GridErrorStateProps> = ({ error, columnCount }) => (
  <tr>
    <td colSpan={columnCount} className="h-32 text-center">
      {typeof error === "string" ? (
        <div className="flex flex-col items-center gap-3 py-8">
          <div className="text-4xl">⚠️</div>
          <div className="text-red-600 font-medium text-sm">{error}</div>
        </div>
      ) : (
        error
      )}
    </td>
  </tr>
);
