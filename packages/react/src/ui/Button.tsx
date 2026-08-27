import React, { ReactNode, useEffect, useRef, useState } from "react";
import type { IconProps } from "react-feather";

import { componentSizeClasses, iconComponentSizeClasses, iconSizeClasses, textTheme, themeVariantClasses } from "~/config/theme";
import type { ComponentSize, ComponentTheme, ComponentVariant } from "~/types";
import Spinner from "~/ui/Spinner";

import { cn } from "~/utils/tailwind";

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

const baseButtonClass =
  "fwr:inline-flex fwr:items-center fwr:justify-center fwr:font-medium fwr:rounded-md fwr:flex-shrink-0 fwr:focus:outline-hidden fwr:focus:ring-2 fwr:cursor-pointer fwr:disabled:opacity-60 fwr:disabled:cursor-not-allowed fwr:disabled:pointer-events-none fwr:transition-all fwr:duration-200 fwr:ease-in-out";

export interface ButtonProps extends Omit<React.ComponentProps<"button">, "title" | "onClick"> {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
  title: ReactNode | string;
  disabled?: boolean;
  icon?: React.ComponentType<IconProps>;
  group?: string;
  mode?: "text" | "icon";
  variant?: ComponentVariant;
  theme?: ComponentTheme;
  size?: ComponentSize;
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

    const sizeClass = mode === "icon" ? iconComponentSizeClasses[size] : componentSizeClasses[size];
    
    const buttonClasses = cn(baseButtonClass, themeVariantClasses[variant][theme], sizeClass, className);
    
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || isLoading || groupLoading}
        className={buttonClasses}
        ref={ref}
        {...(typeof title === "string"
          ? {
              title
            }
          : {})}
        {...rest}
      >
        {isLoading ? (
          <Spinner className={cn(iconSizeClasses[size], textTheme[variant][theme])} />
        ) : IconComponent ? (
          <IconComponent
            {...({
              className: cn(iconSizeClasses[size], "fwr:text-inherit")
            } as any)}
          />
        ) : null}
        {mode !== "icon" && title}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
