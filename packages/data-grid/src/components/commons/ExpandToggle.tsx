import React from "react";

export interface ExpandToggleProps {
  isExpanded: boolean;
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

/**
 * Toggle button for expanding/collapsing rows
 */
export const ExpandToggle: React.FC<ExpandToggleProps> = ({ isExpanded, onClick, disabled = false }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.stopPropagation();
      onClick(event as unknown as React.MouseEvent);
    }
  };

  const chevronRight = (
    <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );

  const chevronDown = (
    <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

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
      {isExpanded ? chevronDown : chevronRight}
    </button>
  );
};
