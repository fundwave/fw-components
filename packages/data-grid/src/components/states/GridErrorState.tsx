import React from "react";

export interface GridErrorStateProps {
  error: string | React.ReactNode;
  columnCount: number;
}

export const GridErrorState: React.FC<GridErrorStateProps> = ({ error, columnCount }) => (
  <tr>
    <td colSpan={columnCount} className="fwgrid:h-32 fwgrid:text-center">
      {typeof error === "string" ? (
        <div className="fwgrid:sticky fwgrid:left-1/2 fwgrid:w-max fwgrid:-translate-x-1/2 fwgrid:flex fwgrid:flex-col fwgrid:items-center fwgrid:gap-3 fwgrid:py-8">
          <div className="fwgrid:text-4xl">⚠️</div>
          <div className="fwgrid:text-red-600 fwgrid:font-medium fwgrid:text-sm">{error}</div>
        </div>
      ) : (
        error
      )}
    </td>
  </tr>
);
