import React from "react";
import { cn } from "../../utils/styling";

export interface SortIndicatorProps {
  isSorted: "asc" | "desc" | false;
  isHovered: boolean;
}

/**
 * Visual sort direction indicator (arrow up/down)
 */
export const SortIndicator: React.FC<SortIndicatorProps> = ({ isSorted, isHovered }) => {
  const arrowUp = (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );

  const arrowDown = (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );

  if (isSorted === "asc") {
    return <span className="text-blue-600 transition-colors duration-200">{arrowUp}</span>;
  }

  if (isSorted === "desc") {
    return <span className="text-blue-600 transition-colors duration-200">{arrowDown}</span>;
  }

  return (
    <span className={cn("transition-opacity duration-200", isHovered ? "opacity-50" : "opacity-0")}>
      {arrowUp}
    </span>
  );
};
