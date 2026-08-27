import * as LucideIcons from "lucide-react";
import * as React from "react";

import { formatComma, undoFormatting } from "../utils/formatting";
import type { IconComponent } from "../types";
import { cn } from "../utils/tailwind";

// Custom ref types with validate methods
export interface InputRef extends HTMLInputElement {
  validate: () => boolean;
}

interface BaseInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  icon?: keyof typeof LucideIcons | IconComponent;
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
  "fwr:block fwr:w-full fwr:rounded-md fwr:text-sm fwr:p-2 fwr:border fwr:border-input fwr:focus:border-primary fwr:focus:ring-primary fwr:transition-colors fwr:duration-150";
const DISABLED_CLASSES =
  "fwr:disabled:bg-muted fwr:disabled:text-muted-foreground fwr:disabled:cursor-not-allowed fwr:disabled:border-input fwr:disabled:focus:border-input fwr:disabled:focus:ring-0";
const ERROR_CLASSES = "fwr:error fwr:border-destructive fwr:focus:border-destructive fwr:focus:ring-destructive";

const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const { className, label, description, icon, errorMessage, required, clearable, invalid: invalidProp, ...restProps } = props;
  const [invalid, setInvalid] = React.useState(invalidProp || false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const ResolvedIcon = typeof icon === "string" ? (LucideIcons[icon] as IconComponent) : (icon ?? null);
  const inputClass = cn(OUTLINED_INPUT_CLASSES, DISABLED_CLASSES, icon ? "fwr:pl-8 fwr:m-0" : "", clearable ? "fwr:pr-8" : "", invalid ? ERROR_CLASSES : "", className);
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
        <label className="fwr:block fwr:text-xs fwr:font-medium fwr:text-foreground fwr:mb-1">
          {label} {required && typeof label === "string" && <span className="fwr:text-destructive">*</span>}
          {description && <p className="fwr:text-xs fwr:text-muted-foreground fwr:mb-2">{description}</p>}
        </label>
      )}
      <div className="fwr:relative fwr:flex fwr:items-center">
        {ResolvedIcon && (
          <div className="fwr:flex fwr:items-center fwr:justify-center fwr:absolute fwr:inset-y-0 fwr:left-0 fwr:pl-2 fwr:pointer-events-none">
            <ResolvedIcon className="fwr:w-4 fwr:h-4 fwr:text-muted-foreground" />
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
            className="fwr:absolute fwr:inset-y-0 fwr:right-0 fwr:pr-2 fwr:flex fwr:items-center fwr:justify-center fwr:text-muted-foreground fwr:hover:text-foreground"
            aria-label="Clear input"
          >
            <LucideIcons.X className="fwr:w-4 fwr:h-4" />
          </button>
        )}
      </div>
      {invalid && <span className="fwr:text-xs fwr:text-destructive fwr:mt-1 fwr:block">{errorMessage || "Please fill this field"}</span>}
    </div>
  );
});
Input.displayName = "Input";

export interface TextareaRef extends HTMLTextAreaElement {
  validate: () => boolean;
}
interface TextareaProps extends Omit<React.ComponentProps<"textarea">, "onChange"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: string;
  invalid?: boolean;
  required?: boolean;
  onChange?: (value: string) => void;
}

const Textarea = React.forwardRef<TextareaRef, TextareaProps>(({ className, label, description, invalid, errorMessage, onChange, required, ...props }, ref) => {
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
        <label className="fwr:block fwr:text-xs fwr:font-medium fwr:text-foreground fwr:mb-1">
          {label} {required && typeof label === "string" && <span className="fwr:text-destructive">*</span>}
          {description && <p className="fwr:text-xs fwr:text-muted-foreground fwr:mb-2">{description}</p>}
        </label>
      )}
      <textarea className={textareaClass} ref={textareaRef} onChange={handleChange} style={{ resize: "none", overflow: "hidden" }} {...props} />
      {invalid && errorMessage && <span className="fwr:text-xs fwr:text-destructive fwr:mt-1 fwr:block">{errorMessage}</span>}
    </div>
  );
});
Textarea.displayName = "Textarea";

export interface CheckboxRef extends HTMLInputElement {
  validate: () => boolean;
}
interface CheckboxProps extends React.ComponentProps<"input"> {
  label?: React.ReactNode;
  labelPosition?: "before" | "after";
  invalid?: boolean;
  errorMessage?: string;
  required?: boolean;
}

const Checkbox = React.forwardRef<CheckboxRef, CheckboxProps>(({ className, label, labelPosition = "before", invalid, errorMessage, required, ...props }, ref) => {
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

  const labelElement = label && (
    <label
      className={cn("fwr:block fwr:text-sm fwr:text-foreground fwr:select-none", labelPosition === "before" ? "fwr:mr-2" : "fwr:ml-2")}
      onClick={(e) => {
        e.preventDefault();
        checkboxRef.current?.click();
      }}
    >
      {label} {required && typeof label === "string" && <span className="fwr:text-destructive">*</span>}
    </label>
  );

  return (
    <div className="fwr:flex fwr:items-start">
      {labelPosition === "before" && labelElement}
      <div className="fwr:flex fwr:items-center fwr:h-5">
        <input
          type="checkbox"
          className={cn(
            "fwr:form-checkbox fwr:h-4 fwr:w-4 fwr:text-primary fwr:border-input fwr:rounded fwr:focus:ring-primary fwr:transition-colors fwr:duration-150",
            "fwr:disabled:bg-muted fwr:disabled:text-muted-foreground fwr:disabled:cursor-not-allowed fwr:disabled:border-input fwr:disabled:focus:border-input fwr:disabled:focus:ring-0",
            invalid ? "fwr:border-destructive fwr:focus:border-destructive fwr:focus:ring-destructive" : "",
            className
          )}
          ref={checkboxRef}
          {...props}
        />
      </div>
      {labelPosition === "after" && labelElement}
      {invalid && errorMessage && <span className="fwr:ml-2 fwr:text-xs fwr:text-destructive fwr:mt-1 fwr:block">{errorMessage}</span>}
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export type { InputProps };
export { Input, Textarea, Checkbox };
export default Input;
