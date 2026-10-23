import React from "react";
import { cn } from "../../utils/styling";

export interface SelectionCheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

/**
 * Checkbox component for row selection.
 * Supports indeterminate state for "select all" header checkbox.
 */
export const SelectionCheckbox: React.FC<SelectionCheckboxProps> = ({
  checked,
  indeterminate = false,
  onChange,
  label = "Select row",
  disabled = false,
}) => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className="flex items-center justify-center">
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "w-4 h-4 rounded border-gray-300 text-blue-600",
          "focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
        disabled={disabled}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
