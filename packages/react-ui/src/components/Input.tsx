import * as LucideIcons from "lucide-react";
import * as React from "react";

import { formatComma, undoFormatting } from "../utils/formatting";
import { cn } from "../utils/tailwind";

// Custom ref types with validate methods
export interface InputRef extends HTMLInputElement {
  validate: () => boolean;
}

interface BaseInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "type"> {
  label?: string;
  icon?: keyof typeof LucideIcons;
  errorMessage?: string;
  required?: boolean;
  invalid?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

interface NumberInputProps extends BaseInputProps {
  type: "number";
  onChange?: (value: number) => void;
  value?: number;
}

interface TextInputProps extends BaseInputProps {
  type?: "date" | "datetime-local" | "submit" | "text";
  onChange?: (value: string) => void;
  value?: string;
}

type InputProps = NumberInputProps | TextInputProps;

const OUTLINED_INPUT_CLASSES =
  "fwui:block fwui:w-full fwui:rounded-md fwui:text-sm fwui:p-2 fwui:border fwui:border-neutral-300 fwui:focus:border-blue-500 fwui:focus:ring-blue-500 fwui:transition-colors fwui:duration-150";
const DISABLED_CLASSES =
  "fwui:disabled:bg-gray-100 fwui:disabled:text-gray-500 fwui:disabled:cursor-not-allowed fwui:disabled:border-gray-300 fwui:disabled:focus:border-gray-300 fwui:disabled:focus:ring-0";
const ERROR_CLASSES = "fwui:error fwui:border-red-500 fwui:focus:border-red-500 fwui:focus:ring-red-500";

const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const { className, label, icon, errorMessage, required, clearable, invalid: invalidProp, ...restProps } = props;
  const [invalid, setInvalid] = React.useState(invalidProp || false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const IconComponent = icon ? (LucideIcons[icon] as React.ComponentType<{ className?: string }>) : null;
  const inputClass = cn(OUTLINED_INPUT_CLASSES, DISABLED_CLASSES, icon ? "fwui:pl-8 fwui:m-0" : "", clearable ? "fwui:pr-8" : "", invalid ? ERROR_CLASSES : "", className);
  const isNumberType = props.type === "number";

  React.useEffect(() => {
    const unformattedInput = undoFormatting(inputValue);
    const unformattedValue = undoFormatting(props.value);
    if (!isNumberType || unformattedInput !== unformattedValue) {
      setInputValue(props.value?.toString() ?? "");
    }
  }, [props.value]);

  React.useEffect(() => {
    setInvalid(invalidProp || false);
  }, [invalidProp]);

  const displayValue = isFocused ? inputValue : ((isNumberType ? formatComma(props.value) : props.value) ?? "");

  React.useImperativeHandle(ref, () => {
    if (inputRef.current) {
      Object.defineProperty(inputRef.current, "validate", {
        value: () => {
          if (!inputRef.current) return true;
          if (required && (!inputRef.current.value || inputRef.current.value.trim() === "")) {
            setInvalid(true);
            return false;
          }
          if (isNumberType && inputRef.current.value) {
            const numValue = undoFormatting(inputRef.current.value);
            return !isNaN(numValue as number);
          }
          const isValid = inputRef.current.checkValidity();
          setInvalid(!isValid);
          return isValid;
        }
      });
      return inputRef.current as InputRef;
    }
    return {
      validate: () => true
    } as InputRef;
  }, [required, isNumberType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (!props.onChange) return;

    if (props.type === "number") {
      const unformattedValue = undoFormatting(newValue);
      props.onChange(unformattedValue as number);
    } else {
      props.onChange(newValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow control keys and shortcuts
    const controlKeys = ["Backspace", "Delete", "Tab", "Escape", "Enter", "Home", "End"];
    if (controlKeys.includes(e.key) || e.key.startsWith("Arrow") || e.ctrlKey || e.metaKey) {
      props.onKeyDown?.(e);
      return;
    }

    if (isNumberType) {
      if (!/^[0-9.,()-]$/.test(e.key)) {
        e.preventDefault();
        return;
      }
    }

    props.onKeyDown?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    setInputValue(props.value?.toString() ?? "");
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleClear = () => {
    handleChange({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>);
    props.onClear?.();
  };

  const typeProps = isNumberType
    ? {
        type: "text",
        autoComplete: "off",
        inputMode: "numeric" as React.InputHTMLAttributes<HTMLInputElement>["inputMode"],
        pattern: "[0-9.(),-]*",
        autoCorrect: "off",
        spellCheck: false
      }
    : {
        type: props.type
      };

  return (
    <div>
      {label && (
        <label className="fwui:block fwui:text-xs fwui:font-medium fwui:text-gray-700 fwui:mb-1">
          {label} {required && typeof label === "string" && <span className="fwui:text-red-500">*</span>}
        </label>
      )}
      <div className="fwui:relative fwui:flex fwui:items-center">
        {IconComponent && (
          <div className="fwui:flex fwui:items-center fwui:justify-center fwui:absolute fwui:inset-y-0 fwui:left-0 fwui:pl-2 fwui:pointer-events-none">
            <IconComponent className="fwui:w-4 fwui:h-4 fwui:text-gray-400" />
          </div>
        )}
        <input
          className={inputClass}
          ref={inputRef}
          {...restProps}
          {...typeProps}
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {clearable && (props.value || props.value === 0) && (
          <button
            onClick={handleClear}
            type="button"
            className="fwui:absolute fwui:inset-y-0 fwui:right-0 fwui:pr-2 fwui:flex fwui:items-center fwui:justify-center fwui:text-gray-400 fwui:hover:text-gray-600"
            aria-label="Clear input"
          >
            <LucideIcons.X className="fwui:w-4 fwui:h-4" />
          </button>
        )}
      </div>
      {invalid && <span className="fwui:text-xs fwui:text-red-600 fwui:mt-1 fwui:block">{errorMessage || "Please fill this field"}</span>}
    </div>
  );
});
Input.displayName = "Input";

export interface TextareaRef extends HTMLTextAreaElement {
  validate: () => boolean;
}
interface TextareaProps extends Omit<React.ComponentProps<"textarea">, "onChange"> {
  label?: string;
  errorMessage?: string;
  invalid?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
}

const Textarea = React.forwardRef<TextareaRef, TextareaProps>(({ className, label, invalid, errorMessage, onChange, required, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const textareaClass = cn(OUTLINED_INPUT_CLASSES, DISABLED_CLASSES, invalid ? ERROR_CLASSES : "", className);

  React.useImperativeHandle(ref, () => {
    if (textareaRef.current) {
      Object.defineProperty(textareaRef.current, "validate", {
        value: () => {
          if (!textareaRef.current) return true;

          if (required && (!textareaRef.current.value || textareaRef.current.value.trim() === "")) {
            return false;
          }

          return textareaRef.current.checkValidity();
        }
      });
      return textareaRef.current as TextareaRef;
    }
    return {
      validate: () => true
    } as TextareaRef;
  }, [required]);

  // Auto-resize functionality
  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  React.useEffect(() => {
    if (props.value && props.value !== "") autoResize();
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
    autoResize();
  };

  return (
    <div>
      {label && (
        <label className="fwui:block fwui:text-xs fwui:font-medium fwui:text-gray-700 fwui:mb-1">
          {label} {required && typeof label === "string" && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea className={textareaClass} ref={textareaRef} onChange={handleChange} style={{ resize: "none", overflow: "hidden" }} {...props} />
      {invalid && errorMessage && <span className="fwui:text-xs fwui:text-red-600 fwui:mt-1 fwui:block">{errorMessage}</span>}
    </div>
  );
});
Textarea.displayName = "Textarea";

export interface CheckboxRef extends HTMLInputElement {
  validate: () => boolean;
}
interface CheckboxProps extends React.ComponentProps<"input"> {
  label?: string;
  invalid?: boolean;
  errorMessage?: string;
  required?: boolean;
}

const Checkbox = React.forwardRef<CheckboxRef, CheckboxProps>(({ className, label, invalid, errorMessage, required, ...props }, ref) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => {
    if (checkboxRef.current) {
      Object.defineProperty(checkboxRef.current, "validate", {
        value: () => {
          if (!checkboxRef.current) return true;
          if (required && !checkboxRef.current.checked) {
            return false;
          }
          return checkboxRef.current.checkValidity();
        }
      });
      return checkboxRef.current as CheckboxRef;
    }
    return {
      validate: () => true
    } as CheckboxRef;
  }, [required]);

  return (
    <div className="fwui:flex fwui:items-start">
      <div className="fwui:flex fwui:items-center fwui:h-5">
        {label && (
          <label className="fwui:mr-2 fwui:block fwui:text-sm fwui:text-gray-700 fwui:select-none" onClick={(e) => e.preventDefault()}>
            {label} {required && typeof label === "string" && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          type="checkbox"
          className={cn(
            "fwui:form-checkbox fwui:h-4 fwui:w-4 fwui:text-blue-600 fwui:border-gray-300 fwui:rounded fwui:focus:ring-blue-500 fwui:transition-colors fwui:duration-150",
            "fwui:disabled:bg-gray-100 fwui:disabled:text-gray-500 fwui:disabled:cursor-not-allowed fwui:disabled:border-gray-300 fwui:disabled:focus:border-gray-300 fwui:disabled:focus:ring-0",
            invalid ? "fwui:border-red-500 fwui:focus:border-red-500 fwui:focus:ring-red-500" : "",
            className
          )}
          ref={checkboxRef}
          {...props}
        />
      </div>
      {invalid && errorMessage && <span className="fwui:ml-2 fwui:text-xs fwui:text-red-600 fwui:mt-1 fwui:block">{errorMessage}</span>}
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export type { InputProps };
export { Input, Textarea, Checkbox };
export default Input;
