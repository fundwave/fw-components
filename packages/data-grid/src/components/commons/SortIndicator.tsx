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
      <span className="fwgrid:text-blue-600 fwgrid:transition-colors fwgrid:duration-200">
        <ArrowUp className="fwgrid:h-4 fwgrid:w-4" />
      </span>
    );
  }

  if (isSorted === "desc") {
    return (
      <span className="fwgrid:text-blue-600 fwgrid:transition-colors fwgrid:duration-200">
        <ArrowDown className="fwgrid:h-4 fwgrid:w-4" />
      </span>
    );
  }

  return (
    <span className={cn("fwgrid:transition-opacity fwgrid:duration-200", isHovered ? "fwgrid:opacity-50" : "fwgrid:opacity-0")}>
      <ArrowUp className="fwgrid:h-4 fwgrid:w-4" />
    </span>
  );
};
