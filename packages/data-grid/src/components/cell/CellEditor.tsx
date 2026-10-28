import { ChevronDown } from "lucide-react";
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
    "fwgrid:w-full fwgrid:h-8 fwgrid:px-2 fwgrid:text-sm fwgrid:rounded-md fwgrid:outline-none fwgrid:transition-all",
    "fwgrid:shadow-sm fwgrid:border",
    "fwgrid:focus:ring-2 fwgrid:focus:ring-blue-500/30 fwgrid:focus:border-blue-500",
    error
      ? "fwgrid:border-red-400 fwgrid:bg-red-50 fwgrid:text-red-900"
      : "fwgrid:border-blue-400 fwgrid:bg-white fwgrid:text-gray-900"
  );

  switch (type) {
    case "text":
      return (
        <div className="fwgrid:relative fwgrid:w-full -fwgrid:my-1">
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
          {error && <div className="fwgrid:absolute fwgrid:top-full fwgrid:left-0 fwgrid:text-[10px] fwgrid:text-red-600 fwgrid:mt-0.5 fwgrid:whitespace-nowrap">{error}</div>}
        </div>
      );

    case "number":
      return (
        <div className="fwgrid:relative fwgrid:w-full -fwgrid:my-1">
          <input
            type="number"
            className={cn(baseInputClass, "fwgrid:tabular-nums fwgrid:text-right")}
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
          {error && <div className="fwgrid:absolute fwgrid:top-full fwgrid:left-0 fwgrid:text-[10px] fwgrid:text-red-600 fwgrid:mt-0.5 fwgrid:whitespace-nowrap">{error}</div>}
        </div>
      );

    case "date":
      return (
        <div className="fwgrid:relative fwgrid:w-full -fwgrid:my-1">
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
          {error && <div className="fwgrid:absolute fwgrid:top-full fwgrid:left-0 fwgrid:text-[10px] fwgrid:text-red-600 fwgrid:mt-0.5 fwgrid:whitespace-nowrap">{error}</div>}
        </div>
      );

    case "select":
      return (
        <div className="fwgrid:relative fwgrid:w-full -fwgrid:my-1">
          <select
            className={cn(baseInputClass, "fwgrid:appearance-none fwgrid:cursor-pointer fwgrid:pr-7")}
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
          <div className="fwgrid:pointer-events-none fwgrid:absolute fwgrid:inset-y-0 fwgrid:right-0 fwgrid:flex fwgrid:items-center fwgrid:pr-2">
            <ChevronDown className="fwgrid:h-4 fwgrid:w-4 fwgrid:text-gray-400" />
          </div>
          {error && <div className="fwgrid:absolute fwgrid:top-full fwgrid:left-0 fwgrid:text-[10px] fwgrid:text-red-600 fwgrid:mt-0.5 fwgrid:whitespace-nowrap">{error}</div>}
        </div>
      );

    case "boolean":
      return (
        <div className="fwgrid:relative fwgrid:flex fwgrid:items-center fwgrid:justify-center -fwgrid:my-1 fwgrid:h-8">
          <label className="fwgrid:relative fwgrid:inline-flex fwgrid:items-center fwgrid:cursor-pointer">
            <input
              type="checkbox"
              className="fwgrid:sr-only fwgrid:peer"
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
              "fwgrid:w-9 fwgrid:h-5 fwgrid:rounded-full fwgrid:transition-colors",
              "fwgrid:peer-focus:ring-2 fwgrid:peer-focus:ring-blue-500/30",
              "fwgrid:peer-checked:bg-blue-600 fwgrid:bg-gray-300",
              "fwgrid:after:content-[''] fwgrid:after:absolute fwgrid:after:top-[2px] fwgrid:after:left-[2px]",
              "fwgrid:after:bg-white fwgrid:after:rounded-full fwgrid:after:h-4 fwgrid:after:w-4 fwgrid:after:transition-transform",
              "fwgrid:peer-checked:after:translate-x-full"
            )} />
          </label>
          {error && <div className="fwgrid:absolute fwgrid:top-full fwgrid:left-0 fwgrid:text-[10px] fwgrid:text-red-600 fwgrid:mt-0.5 fwgrid:whitespace-nowrap">{error}</div>}
        </div>
      );

    default:
      return null;
  }
};
