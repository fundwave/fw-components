import React from "react";
import { cn } from "../../utils/styling";

export interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
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
    <div className="fwgrid:flex fwgrid:items-center fwgrid:justify-center">
      <input
        ref={ref}
        type="checkbox"
        className={cn(
          "fwgrid:w-4 fwgrid:h-4 fwgrid:rounded fwgrid:border-gray-300 fwgrid:text-blue-600",
          "fwgrid:focus:ring-2 fwgrid:focus:ring-blue-500/20 fwgrid:focus:ring-offset-0",
          disabled && "fwgrid:opacity-50 fwgrid:cursor-not-allowed"
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
