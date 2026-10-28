import { Inbox } from "lucide-react";
import React from "react";

export interface GridEmptyStateProps {
  message?: string | React.ReactNode;
  ctaLabel?: string;
  onCtaClick?: () => void;
  columnCount: number;
}

export const GridEmptyState: React.FC<GridEmptyStateProps> = ({
  message = "No data to display",
  ctaLabel,
  onCtaClick,
  columnCount,
}) => (
  <tr>
    <td colSpan={columnCount} className="fwgrid:h-32 fwgrid:px-6 fwgrid:text-center">
      {typeof message === "string" ? (
        <div className="fwgrid:flex fwgrid:flex-col fwgrid:items-center fwgrid:justify-center fwgrid:gap-3 fwgrid:py-8 fwgrid:text-gray-500">
          <Inbox className="fwgrid:w-12 fwgrid:h-12 fwgrid:text-gray-300" strokeWidth={1} />

          <div className="fwgrid:text-sm fwgrid:font-medium fwgrid:text-gray-600">{message}</div>

          {ctaLabel && onCtaClick && (
            <button
              className="fwgrid:px-4 fwgrid:py-2 fwgrid:text-xs fwgrid:font-medium fwgrid:text-white fwgrid:bg-blue-600 fwgrid:rounded fwgrid:hover:bg-blue-700 fwgrid:transition-colors"
              onClick={onCtaClick}
              type="button"
            >
              {ctaLabel}
            </button>
          )}
        </div>
      ) : (
        message
      )}
    </td>
  </tr>
);
