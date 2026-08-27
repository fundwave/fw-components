import * as React from "react";
import * as FeatherIcons from "react-feather";

import { componentSizeClasses, iconSizeClasses, themeVariantClasses } from "../config/theme";

import { cn } from "../utils/tailwind";

import type { ComponentSize, ComponentTheme } from "../types";

// import { formatComma, undoFormatting } from "@fundwave/ui-utils/src/ValueFormatter.js";

// Custom ref types with validate methods
export interface InputRef extends HTMLInputElement {
  validate: () => boolean;
}
interface BaseInputProps extends Omit<React.ComponentProps<"input">, "onChange" | "type" | "size"> {
  label?: string;
  icon?: keyof typeof FeatherIcons;
  errorMessage?: string;
  required?: boolean;
  invalid?: boolean;
  size?: ComponentSize;
  theme?: ComponentTheme;
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
const OUTLINED_INPUT_CLASSES = "block w-full rounded-md shadow-sm border transition-colors duration-150";
const DISABLED_CLASSES =
  "disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:border-input disabled:focus:border-input disabled:focus:ring-0 disabled:opacity-50";
const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const { className, label, icon, errorMessage, required, size = "md", theme = "secondary", ...restProps } = props;
  const [invalid, setInvalid] = React.useState(props.invalid || false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const IconComponent = icon ? FeatherIcons[icon] : null;
  const themeClass = invalid ? themeVariantClasses.ghost.danger : themeVariantClasses.ghost[theme];
  const inputClass = cn(OUTLINED_INPUT_CLASSES, DISABLED_CLASSES, componentSizeClasses[size], themeClass, icon ? "pl-8 m-0" : "", className);
  const isNumberType = props.type === "number";
  React.useImperativeHandle(ref, () => {
    if (inputRef.current) {
      Object.defineProperty(inputRef.current, "validate", {
        value: () => {
          if (!inputRef.current) return true;
          if (required && (!inputRef.current.value || inputRef.current.value.trim() === "")) {
            return false;
          }
          // if (isNumberType && inputRef.current.value) {
          //   const numValue = undoFormatting(inputRef.current.value);
          //   return !isNaN(numValue);
          // }
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
    if (!props.onChange) return;
    if (props.type === "number") {
      // const unformattedValue = undoFormatting(e.target.value);
      props.onChange?.(+e.target.value);
    } else {
      props.onChange?.(e.target.value);
    }
  };

  // const displayValue = isNumberType && props.value ? formatComma(props.value.toString()) : props.value;
  const displayValue = isNumberType && props.value ? props.value.toString() : props.value;
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
      {label && <label className="fwr:block fwr:text-xs fwr:font-medium fwr:text-foreground fwr:mb-1">{label}</label>}
      <div className="fwr:relative fwr:flex fwr:items-center">
        {IconComponent && (
          <div className="fwr:flex fwr:items-center fwr:justify-center fwr:absolute fwr:inset-y-0 fwr:left-0 fwr:pl-2 fwr:pointer-events-none">
            <IconComponent className={cn(iconSizeClasses.md, "fwr:text-muted-foreground")} />
          </div>
        )}
        <input className={inputClass} ref={inputRef} value={displayValue} {...typeProps} {...restProps} onChange={handleChange} />
      </div>
      {invalid && <span className="fwr:text-xs fwr:text-destructive fwr:mt-1 fwr:block fwr:font-medium">{errorMessage || "Please fill this field"}</span>}
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
  size?: ComponentSize;
  theme?: ComponentTheme;
}
const Textarea = React.forwardRef<TextareaRef, TextareaProps>(({ className, label, invalid, errorMessage, onChange, required, size = "md", theme = "primary", ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const themeClass = invalid ? themeVariantClasses.ghost.danger : themeVariantClasses.ghost[theme];
  const textareaClass = cn(OUTLINED_INPUT_CLASSES, DISABLED_CLASSES, componentSizeClasses[size], themeClass, className);
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
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <div>
      {label && <label className="fwr:block fwr:text-xs fwr:font-medium fwr:text-foreground fwr:mb-1">{label}</label>}
      <textarea className={textareaClass} ref={textareaRef} onChange={handleChange} {...props} />
      {invalid && errorMessage && <span className="fwr:text-xs fwr:text-destructive fwr:mt-1 fwr:block fwr:font-medium">{errorMessage}</span>}
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
  theme?: ComponentTheme;
}
const Checkbox = React.forwardRef<CheckboxRef, CheckboxProps>(({ className, label, invalid, errorMessage, required, theme = "primary", ...props }, ref) => {
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
  const checkboxThemeClass = invalid ? themeVariantClasses.ghost.danger : themeVariantClasses.ghost[theme];
  return (
    <div className="fwr:flex fwr:items-start">
      <div className="fwr:flex fwr:items-center fwr:h-5">
        <input
          type="checkbox"
          className={cn(
            "fwr:form-checkbox fwr:h-4 fwr:w-4 fwr:rounded-xs fwr:transition-colors fwr:duration-150",
            checkboxThemeClass,
            "disabled:fwr:bg-muted disabled:fwr:text-muted-foreground disabled:fwr:cursor-not-allowed disabled:fwr:border-input disabled:focus:fwr:border-input disabled:focus:fwr:ring-0 disabled:fwr:opacity-50",
            className
          )}
          ref={checkboxRef}
          {...props}
        />
      </div>
      {label && (
        <label className="fwr:ml-2 fwr:block fwr:text-sm fwr:text-foreground fwr:select-none" onClick={(e) => e.preventDefault()}>
          {label}
        </label>
      )}
      {invalid && errorMessage && <span className="fwr:ml-2 fwr:text-xs fwr:text-destructive fwr:mt-1 fwr:block fwr:font-medium">{errorMessage}</span>}
    </div>
  );
});
Checkbox.displayName = "Checkbox";
export { Input, Textarea, Checkbox };
