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
    <td colSpan={columnCount} className="h-32 px-6 text-center">
      {typeof message === "string" ? (
        <div className="flex flex-col items-center justify-center gap-3 py-8 text-gray-500">
          <Inbox className="w-12 h-12 text-gray-300" strokeWidth={1} />

          <div className="text-sm font-medium text-gray-600">{message}</div>

          {ctaLabel && onCtaClick && (
            <button
              className="px-4 py-2 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
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
