import React from "react";
import type { SelectOption } from "../../types";
import { cn } from "../../utils/styling";

// ============================================================================
// CELL EDITOR TYPES
// ============================================================================

export interface CellEditorProps {
  type: "text" | "number" | "date" | "select" | "boolean";
  value: unknown;
  options?: SelectOption[];
  onChange: (value: unknown) => void;
  onCommit: () => void;
  onCancel: () => void;
  error?: string | null;
  autoFocus?: boolean;
}

// ============================================================================
// CELL EDITOR COMPONENT
// ============================================================================

/**
 * Built-in cell editor that renders the appropriate input type.
 * Handles keyboard interactions (Enter to commit, Escape to cancel).
 */
export const CellEditor: React.FC<CellEditorProps> = ({
  type,
  value,
  options = [],
  onChange,
  onCommit,
  onCancel,
  error,
  autoFocus = true,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onCommit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
    // Stop propagation to prevent row-level handlers
    e.stopPropagation();
  };

  const baseInputClass = cn(
    "w-full h-8 px-2 text-sm rounded-md outline-none transition-all",
    "shadow-sm border",
    "focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500",
    error
      ? "border-red-400 bg-red-50 text-red-900"
      : "border-blue-400 bg-white text-gray-900"
  );

  switch (type) {
    case "text":
      return (
        <div className="relative w-full -my-1">
          <input
            type="text"
            className={baseInputClass}
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={onCommit}
            autoFocus={autoFocus}
            onClick={(e) => e.stopPropagation()}
          />
          {error && <div className="absolute top-full left-0 text-[10px] text-red-600 mt-0.5 whitespace-nowrap">{error}</div>}
        </div>
      );

    case "number":
      return (
        <div className="relative w-full -my-1">
          <input
            type="number"
            className={cn(baseInputClass, "tabular-nums text-right")}
            value={value === null || value === undefined ? "" : String(value)}
            onChange={(e) => {
              const v = e.target.value;
              onChange(v === "" ? null : parseFloat(v));
            }}
            onKeyDown={handleKeyDown}
            onBlur={onCommit}
            autoFocus={autoFocus}
            step="any"
            onClick={(e) => e.stopPropagation()}
          />
          {error && <div className="absolute top-full left-0 text-[10px] text-red-600 mt-0.5 whitespace-nowrap">{error}</div>}
        </div>
      );

    case "date":
      return (
        <div className="relative w-full -my-1">
          <input
            type="date"
            className={baseInputClass}
            value={value ? String(value).split("T")[0] : ""}
            onChange={(e) => onChange(e.target.value || null)}
            onKeyDown={handleKeyDown}
            onBlur={onCommit}
            autoFocus={autoFocus}
            onClick={(e) => e.stopPropagation()}
          />
          {error && <div className="absolute top-full left-0 text-[10px] text-red-600 mt-0.5 whitespace-nowrap">{error}</div>}
        </div>
      );

    case "select":
      return (
        <div className="relative w-full -my-1">
          <select
            className={cn(baseInputClass, "appearance-none cursor-pointer pr-7")}
            value={String(value ?? "")}
            onChange={(e) => {
              onChange(e.target.value);
              // Auto-commit for select
              setTimeout(onCommit, 0);
            }}
            onKeyDown={handleKeyDown}
            onBlur={onCommit}
            autoFocus={autoFocus}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="" disabled>Select...</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {error && <div className="absolute top-full left-0 text-[10px] text-red-600 mt-0.5 whitespace-nowrap">{error}</div>}
        </div>
      );

    case "boolean":
      return (
        <div className="flex items-center justify-center -my-1 h-8">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={Boolean(value)}
              onChange={(e) => {
                onChange(e.target.checked);
                // Auto-commit for boolean
                setTimeout(onCommit, 0);
              }}
              onKeyDown={handleKeyDown}
              autoFocus={autoFocus}
              onClick={(e) => e.stopPropagation()}
            />
            <div className={cn(
              "w-9 h-5 rounded-full transition-colors",
              "peer-focus:ring-2 peer-focus:ring-blue-500/30",
              "peer-checked:bg-blue-600 bg-gray-300",
              "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
              "after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-transform",
              "peer-checked:after:translate-x-full"
            )} />
          </label>
        </div>
      );

    default:
      return null;
  }
};
