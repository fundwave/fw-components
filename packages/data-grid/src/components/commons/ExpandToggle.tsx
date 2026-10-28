import { ChevronDown, ChevronRight } from "lucide-react";
import React from "react";

export interface ExpandToggleProps {
  isExpanded: boolean;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

export const ExpandToggle: React.FC<ExpandToggleProps> = ({ isExpanded, onClick, disabled = false }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      onClick(event as unknown as React.MouseEvent);
    }
  };

  return (
    <button
      className="fwgrid:inline-flex fwgrid:items-center fwgrid:justify-center fwgrid:p-1 fwgrid:rounded fwgrid:hover:bg-gray-100 fwgrid:mr-2 fwgrid:focus-visible:outline-none fwgrid:focus-visible:ring-2 fwgrid:focus-visible:ring-blue-500"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      type="button"
      disabled={disabled}
      aria-label={isExpanded ? "Collapse row" : "Expand row"}
      aria-expanded={isExpanded}
    >
      {isExpanded ? (
        <ChevronDown className="fwgrid:h-4 fwgrid:w-4 fwgrid:text-gray-500" />
      ) : (
        <ChevronRight className="fwgrid:h-4 fwgrid:w-4 fwgrid:text-gray-500" />
      )}
    </button>
  );
};
