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
      className="inline-flex items-center justify-center p-1 rounded hover:bg-gray-100 mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      type="button"
      disabled={disabled}
      aria-label={isExpanded ? "Collapse row" : "Expand row"}
      aria-expanded={isExpanded}
    >
      {isExpanded ? (
        <ChevronDown className="h-4 w-4 text-gray-500" />
      ) : (
        <ChevronRight className="h-4 w-4 text-gray-500" />
      )}
    </button>
  );
};
