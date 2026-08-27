import type { LucideIcon, LucideProps } from "lucide-react";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import Spinner from "./Spinner";

import { cn } from "../utils/tailwind";

class GroupLoadingEmitter {
  listeners: Record<string, Set<(loading: boolean) => void>> = {};
  emit(group: string, loading: boolean) {
    if (this.listeners[group]) {
      this.listeners[group].forEach((cb) => {
        cb(loading);
      });
    }
  }
  subscribe(group: string, cb: (loading: boolean) => void) {
    if (!this.listeners[group]) this.listeners[group] = new Set();
    this.listeners[group].add(cb);
    return () => {
      this.listeners[group].delete(cb);
    };
  }
}
const groupLoadingEmitter = new GroupLoadingEmitter();

export const themeVariantClasses: Record<"primary" | "secondary" | "danger", Record<"filled" | "outlined" | "ghost" | "plain" | "link", string>> = {
  primary: {
    filled: "fwui:text-white fwui:bg-primary fwui:border fwui:border-transparent fwui:shadow-sm fwui:hover:bg-primary/90 fwui:hover:shadow-lg",
    outlined: "fwui:text-primary fwui:bg-white fwui:border fwui:border-primary fwui:shadow-sm fwui:hover:bg-primary/20 fwui:focus:bg-primary/20 fwui:focus:text-primary",
    plain:
      "fwui:text-primary fwui:bg-transparent fwui:border fwui:border-transparent fwui:hover:text-primary fwui:hover:bg-primary/20 fwui:hover:border fwui:hover:border-primary fwui:focus:bg-primary/20 fwui:focus:ring-primary",
    ghost:
      "fwui:text-gray-500 fwui:bg-transparent fwui:border fwui:border-transparent fwui:hover:text-primary fwui:hover:bg-primary/20 fwui:hover:border fwui:hover:border-primary fwui:focus:bg-primary/20 fwui:focus:text-primary fwui:focus:ring-primary",
    link: "fwui:bg-none fwui:underline-offset-4 fwui:underline fwui:hover:text-primary"
  },
  secondary: {
    filled: "fwui:text-white fwui:bg-gray-600 fwui:border fwui:border-transparent fwui:shadow-sm fwui:hover:bg-gray-700 fwui:focus:bg-gray-700 fwui:focus:text-white",
    outlined: "fwui:text-gray-700 fwui:bg-white fwui:border fwui:border-gray-300 fwui:shadow-sm fwui:hover:bg-gray-100 fwui:focus:bg-gray-100 fwui:focus:text-gray-900",
    plain:
      "fwui:text-gray-700 fwui:bg-transparent fwui:border fwui:border-transparent fwui:hover:text-gray-900 fwui:hover:bg-gray-100 fwui:hover:border fwui:hover:border-gray-200 fwui:focus:bg-gray-100 fwui:focus:text-gray-900 fwui:focus:ring-gray-200",
    ghost:
      "fwui:text-gray-500 fwui:bg-transparent fwui:border fwui:border-transparent fwui:hover:text-gray-700 fwui:hover:bg-gray-100 fwui:hover:border fwui:hover:border-gray-200 fwui:focus:bg-gray-100 fwui:focus:text-gray-700 fwui:focus:ring-gray-200",
    link: "fwui:bg-none fwui:underline-offset-4 fwui:underline fwui:hover:text-gray-700"
  },
  danger: {
    filled: "fwui:text-white fwui:bg-red-600 fwui:border fwui:border-transparent fwui:shadow-sm fwui:hover:bg-red-700 fwui:focus:bg-red-700 fwui:focus:text-white",
    outlined: "fwui:text-red-700 fwui:bg-white fwui:border fwui:border-red-300 fwui:shadow-sm fwui:hover:bg-red-100 fwui:focus:bg-red-100 fwui:focus:text-red-800",
    plain:
      "fwui:text-red-700 fwui:bg-transparent fwui:border fwui:border-transparent fwui:hover:text-red-800 fwui:hover:bg-red-100 fwui:hover:border fwui:hover:border-red-200 fwui:focus:bg-red-100 fwui:focus:text-red-800 fwui:focus:ring-red-200",
    ghost:
      "fwui:text-gray-500 fwui:bg-transparent fwui:border fwui:border-transparent fwui:hover:text-red-700 fwui:hover:bg-red-100 fwui:hover:border fwui:hover:border-red-200 fwui:focus:bg-red-100 fwui:focus:text-red-700 fwui:focus:ring-red-200",
    link: "fwui:bg-none fwui:underline-offset-4 fwui:underline fwui:hover:text-red-700"
  }
};

const baseButtonClass =
  "fwui:inline-flex fwui:items-center fwui:justify-center fwui:font-medium fwui:rounded-md fwui:flex-shrink-0 fwui:focus:outline-none fwui:disabled:opacity-50 fwui:disabled:cursor-not-allowed fwui:disabled:pointer-events-none fwui:transition-all fwui:duration-200 fwui:ease-in-out fwui:hover:cursor-pointer";

const sizeClasses: Record<"text" | "icon", Record<"sm" | "md" | "lg" | "base", string>> = {
  text: {
    base: "fwui:text-sm fwui:px-0 fwui:py-0 fwui:gap-0",
    sm: "fwui:text-xs fwui:px-2 fwui:py-0.5 fwui:gap-1",
    md: "fwui:text-sm fwui:px-3 fwui:py-2 fwui:gap-2",
    lg: "fwui:text-base fwui:px-4 fwui:py-3 fwui:gap-2"
  },
  icon: {
    base: "fwui:p-2",
    sm: "fwui:p-2",
    md: "fwui:p-2.5",
    lg: "fwui:p-3.5"
  }
};

const iconSizeClasses: Record<"sm" | "md" | "lg" | "base", string> = {
  base: "fwui:w-4 fwui:h-4",
  sm: "fwui:w-3.5 fwui:h-3.5",
  md: "fwui:w-4 fwui:h-4",
  lg: "fwui:w-5 fwui:h-5"
};

const spinnerColorClasses: Record<"primary" | "secondary" | "danger", Record<"filled" | "outlined" | "ghost" | "plain" | "link", string>> = {
  primary: {
    filled: "fwui:text-white",
    outlined: "fwui:text-primary",
    ghost: "fwui:text-primary",
    plain: "fwui:text-primary",
    link: "fwui:text-primary"
  },
  secondary: {
    filled: "fwui:text-white",
    outlined: "fwui:text-gray-600",
    ghost: "fwui:text-gray-600",
    plain: "fwui:text-gray-600",
    link: "fwui:text-gray-600"
  },
  danger: {
    filled: "fwui:text-white",
    outlined: "fwui:text-red-600",
    ghost: "fwui:text-red-600",
    plain: "fwui:text-red-600",
    link: "fwui:text-red-600"
  }
};

export interface ButtonProps extends Omit<React.ComponentProps<"button">, "title" | "onClick"> {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
  title: ReactNode | string;
  disabled?: boolean;
  icon?: React.ComponentType<LucideProps> | LucideIcon;
  group?: string;
  mode?: "text" | "icon";
  variant?: "filled" | "outlined" | "ghost" | "plain" | "link";
  theme?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg" | "base";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { onClick, disabled = false, title, icon: IconComponent, mode = "text", variant: initialVariant, className = "", group: groupName, theme: initialTheme, size = "md", ...rest },
    ref
  ) => {
    const variant = initialVariant || (mode === "icon" ? "ghost" : "filled");
    const theme = initialTheme || "primary";

    const [isLoading, setIsLoading] = useState(false);
    const [groupLoading, setGroupLoading] = useState(false);
    const isMounted = useRef(true);

    useEffect(() => {
      isMounted.current = true;
      if (!groupName) return;
      const unsub = groupLoadingEmitter.subscribe(groupName, (loading) => {
        if (isMounted.current) setGroupLoading(loading);
      });
      return () => {
        isMounted.current = false;
        if (unsub) unsub();
      };
    }, [groupName]);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (!onClick) return;
      e.stopPropagation();
      setIsLoading(true);
      if (groupName) groupLoadingEmitter.emit(groupName, true);
      try {
        await onClick(e);
      } catch (error) {
        console.error("Action failed:", error);
      } finally {
        setIsLoading(false);
        if (groupName) groupLoadingEmitter.emit(groupName, false);
      }
    };

    const buttonClasses = cn(baseButtonClass, themeVariantClasses[theme][variant], sizeClasses[mode][size], className);

    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || isLoading || groupLoading}
        className={buttonClasses}
        ref={ref}
        {...(typeof title === "string" ? { title } : {})}
        {...rest}
      >
        {isLoading ? (
          <Spinner className={cn(iconSizeClasses[size], spinnerColorClasses[theme][variant])} />
        ) : IconComponent ? (
          <IconComponent className={cn(iconSizeClasses[size], "fwui:text-inherit")} />
        ) : null}
        {mode !== "icon" && title}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;
