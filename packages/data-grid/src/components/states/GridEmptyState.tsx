import React from "react";

export interface GridEmptyStateProps {
  message?: string | React.ReactNode;
  ctaLabel?: string;
  onCtaClick?: () => void;
  columnCount: number;
}

/**
 * Empty state shown when the grid has no data to display.
 */
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
          {/* Empty icon */}
          <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>

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
