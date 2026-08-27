import type { LucideIcon } from "lucide-react";
import React, { ReactNode, useEffect, useRef, useState } from "react";

import Spinner from "./Spinner";

import { groupLoadingEmitter } from "../providers/groupLoadingEmitter";
import type { IconComponent } from "../types";
import { cn } from "../utils/tailwind";

export const themeVariantClasses: Record<"primary" | "secondary" | "danger", Record<"filled" | "outlined" | "ghost" | "plain" | "link", string>> = {
  primary: {
    filled: "fwr:text-primary-foreground fwr:bg-primary fwr:border fwr:border-transparent fwr:shadow-sm fwr:hover:bg-primary/90 fwr:hover:shadow-lg",
    outlined: "fwr:text-primary fwr:bg-background fwr:border fwr:border-primary fwr:shadow-sm fwr:hover:bg-primary/20 fwr:focus:bg-primary/20 fwr:focus:text-primary",
    plain:
      "fwr:text-primary fwr:bg-transparent fwr:border fwr:border-transparent fwr:hover:text-primary fwr:hover:bg-primary/20 fwr:hover:border fwr:hover:border-primary fwr:focus:bg-primary/20 fwr:focus:ring-primary",
    ghost:
      "fwr:text-muted-foreground fwr:bg-transparent fwr:border fwr:border-transparent fwr:hover:text-primary fwr:hover:bg-primary/20 fwr:hover:border fwr:hover:border-primary fwr:focus:bg-primary/20 fwr:focus:text-primary fwr:focus:ring-primary",
    link: "fwr:bg-none fwr:underline-offset-4 fwr:underline fwr:hover:text-primary"
  },
  secondary: {
    filled: "fwr:text-secondary-foreground fwr:bg-secondary fwr:border fwr:border-transparent fwr:shadow-sm fwr:hover:bg-secondary/90 fwr:focus:bg-secondary/90 fwr:focus:text-secondary-foreground",
    outlined: "fwr:text-secondary fwr:bg-background fwr:border fwr:border-secondary fwr:shadow-sm fwr:hover:bg-secondary/10 fwr:focus:bg-secondary/10 fwr:focus:text-secondary",
    plain:
      "fwr:text-secondary fwr:bg-transparent fwr:border fwr:border-transparent fwr:hover:text-secondary fwr:hover:bg-secondary/10 fwr:hover:border fwr:hover:border-secondary/30 fwr:focus:bg-secondary/10 fwr:focus:text-secondary fwr:focus:ring-secondary/30",
    ghost:
      "fwr:text-muted-foreground fwr:bg-transparent fwr:border fwr:border-transparent fwr:hover:text-secondary fwr:hover:bg-secondary/10 fwr:hover:border fwr:hover:border-secondary/30 fwr:focus:bg-secondary/10 fwr:focus:text-secondary fwr:focus:ring-secondary/30",
    link: "fwr:bg-none fwr:underline-offset-4 fwr:underline fwr:hover:text-secondary"
  },
  danger: {
    filled: "fwr:text-destructive-foreground fwr:bg-destructive fwr:border fwr:border-transparent fwr:shadow-sm fwr:hover:bg-destructive/90 fwr:focus:bg-destructive/90 fwr:focus:text-destructive-foreground",
    outlined: "fwr:text-destructive fwr:bg-background fwr:border fwr:border-destructive fwr:shadow-sm fwr:hover:bg-destructive/20 fwr:focus:bg-destructive/20 fwr:focus:text-destructive",
    plain:
      "fwr:text-destructive fwr:bg-transparent fwr:border fwr:border-transparent fwr:hover:text-destructive fwr:hover:bg-destructive/20 fwr:hover:border fwr:hover:border-destructive fwr:focus:bg-destructive/20 fwr:focus:text-destructive fwr:focus:ring-destructive",
    ghost:
      "fwr:text-muted-foreground fwr:bg-transparent fwr:border fwr:border-transparent fwr:hover:text-destructive fwr:hover:bg-destructive/20 fwr:hover:border fwr:hover:border-destructive fwr:focus:bg-destructive/20 fwr:focus:text-destructive fwr:focus:ring-destructive",
    link: "fwr:bg-none fwr:underline-offset-4 fwr:underline fwr:hover:text-destructive"
  }
};

const baseButtonClass =
  "fwr:inline-flex fwr:items-center fwr:justify-center fwr:font-medium fwr:rounded-md fwr:flex-shrink-0 fwr:focus:outline-none fwr:disabled:opacity-50 fwr:disabled:cursor-not-allowed fwr:disabled:pointer-events-none fwr:transition-all fwr:duration-200 fwr:ease-in-out fwr:hover:cursor-pointer";

const sizeClasses: Record<"text" | "icon", Record<"sm" | "md" | "lg" | "base", string>> = {
  text: {
    base: "fwr:text-sm fwr:px-0 fwr:py-0 fwr:gap-0",
    sm: "fwr:text-xs fwr:px-2 fwr:py-0.5 fwr:gap-1",
    md: "fwr:text-sm fwr:px-3 fwr:py-2 fwr:gap-2",
    lg: "fwr:text-base fwr:px-4 fwr:py-3 fwr:gap-2"
  },
  icon: {
    base: "fwr:p-2",
    sm: "fwr:p-2",
    md: "fwr:p-2.5",
    lg: "fwr:p-3.5"
  }
};

const iconSizeClasses: Record<"sm" | "md" | "lg" | "base", string> = {
  base: "fwr:w-4 fwr:h-4",
  sm: "fwr:w-3.5 fwr:h-3.5",
  md: "fwr:w-4 fwr:h-4",
  lg: "fwr:w-5 fwr:h-5"
};

const spinnerColorClasses: Record<"primary" | "secondary" | "danger", Record<"filled" | "outlined" | "ghost" | "plain" | "link", string>> = {
  primary: {
    filled: "fwr:text-primary-foreground",
    outlined: "fwr:text-primary",
    ghost: "fwr:text-primary",
    plain: "fwr:text-primary",
    link: "fwr:text-primary"
  },
  secondary: {
    filled: "fwr:text-secondary-foreground",
    outlined: "fwr:text-secondary",
    ghost: "fwr:text-secondary",
    plain: "fwr:text-secondary",
    link: "fwr:text-secondary"
  },
  danger: {
    filled: "fwr:text-destructive-foreground",
    outlined: "fwr:text-destructive",
    ghost: "fwr:text-destructive",
    plain: "fwr:text-destructive",
    link: "fwr:text-destructive"
  }
};

export interface ButtonProps extends Omit<React.ComponentProps<"button">, "title" | "onClick"> {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
  title: ReactNode | string;
  disabled?: boolean;
  icon?: IconComponent | LucideIcon;
  iconPosition?: "prefix" | "suffix";
  group?: string;
  mode?: "text" | "icon";
  variant?: "filled" | "outlined" | "ghost" | "plain" | "link";
  theme?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg" | "base";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick,
      disabled = false,
      title,
      icon: IconComponent,
      iconPosition = "prefix",
      mode = "text",
      variant: initialVariant,
      className = "",
      group: groupName,
      theme: initialTheme,
      size = "md",
      ...rest
    },
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

    const renderIcon = () => {
      if (isLoading) {
        return <Spinner className={cn(iconSizeClasses[size], spinnerColorClasses[theme][variant])} />;
      }
      if (IconComponent) {
        return <IconComponent className={cn(iconSizeClasses[size], "fwr:text-inherit")} />;
      }
      return null;
    };

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
        {mode === "icon" ? (
          renderIcon()
        ) : (
          <>
            {iconPosition === "prefix" && renderIcon()}
            {title}
            {iconPosition === "suffix" && renderIcon()}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export default Button;
