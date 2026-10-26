import React from "react";
import type { SelectOption } from "../../types";
import { cn } from "../../utils/styling";

/**
 * Normalizes a value to the `YYYY-MM-DD` an `<input type="date">` expects.
 * `String(dateInstance)` isn't ISO, so a `Date` needs its own local calendar fields.
 */
function toDateInputValue(value: unknown): string {
  if (!value) return "";
  if (value instanceof Date) {
    if (isNaN(value.getTime())) return "";
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return String(value).split("T")[0];
}

export interface CellEditorProps {
  type: "text" | "number" | "date" | "select" | "boolean";
  value: unknown;
  options?: SelectOption[];
  onChange: (value: unknown) => void;
  onCommit: () => void;
  onCancel: () => void;
  error?: string | null;
  autoFocus?: boolean;
  commitOnBlur?: boolean;
  /** Accessible name for the input, since it replaces the read-mode cell's own label */
  label?: string;
}

export const CellEditor: React.FC<CellEditorProps> = ({
  type,
  value,
  options = [],
  onChange,
  onCommit,
  onCancel,
  error,
  autoFocus = true,
  commitOnBlur = true,
  label,
}) => {
  const handleBlur = commitOnBlur ? onCommit : undefined;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onCommit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
    // Prevent the row's own click handler from also firing.
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
            onBlur={handleBlur}
            autoFocus={autoFocus}
            aria-label={label}
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
            onBlur={handleBlur}
            autoFocus={autoFocus}
            aria-label={label}
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
            value={toDateInputValue(value)}
            onChange={(e) => onChange(e.target.value || null)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus={autoFocus}
            aria-label={label}
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
              // The DOM always reports a string — resolve back to the option's value so
              // a numeric `SelectOption.value` stays numeric.
              const raw = e.target.value;
              const matched = options.find((opt) => String(opt.value) === raw);
              onChange(matched ? matched.value : raw);
              setTimeout(onCommit, 0);
            }}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            autoFocus={autoFocus}
            aria-label={label}
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
        <div className="relative flex items-center justify-center -my-1 h-8">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={Boolean(value)}
              onChange={(e) => {
                onChange(e.target.checked);
                setTimeout(onCommit, 0);
              }}
              onKeyDown={handleKeyDown}
              autoFocus={autoFocus}
            aria-label={label}
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
          {error && <div className="absolute top-full left-0 text-[10px] text-red-600 mt-0.5 whitespace-nowrap">{error}</div>}
        </div>
      );

    default:
      return null;
  }
};
