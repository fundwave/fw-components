import { ArrowDown, ArrowUp } from "lucide-react";
import React from "react";
import { cn } from "../../utils/styling";

export interface SortIndicatorProps {
  isSorted: "asc" | "desc" | false;
  isHovered: boolean;
}

export const SortIndicator: React.FC<SortIndicatorProps> = ({ isSorted, isHovered }) => {
  if (isSorted === "asc") {
    return (
      <span className="text-blue-600 transition-colors duration-200">
        <ArrowUp className="h-4 w-4" />
      </span>
    );
  }

  if (isSorted === "desc") {
    return (
      <span className="text-blue-600 transition-colors duration-200">
        <ArrowDown className="h-4 w-4" />
      </span>
    );
  }

  return (
    <span className={cn("transition-opacity duration-200", isHovered ? "opacity-50" : "opacity-0")}>
      <ArrowUp className="h-4 w-4" />
    </span>
  );
};
