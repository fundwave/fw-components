import type * as React from "react";

import { cn } from "../utils/tailwind";

import type { BadgeTheme, BadgeVariant } from "../types";

const themeVariantClasses: Record<BadgeTheme, Record<BadgeVariant, string>> = {
  primary: {
    filled: "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
    outline: "border-accent text-accent hover:bg-accent/10"
  },
  secondary: {
    filled: "border-transparent bg-base text-base-foreground hover:bg-base/80",
    outline: "border-border text-base-foreground hover:bg-base/50"
  },
  destructive: {
    filled: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "border-destructive text-destructive hover:bg-destructive/10"
  }
};
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  theme?: BadgeTheme;
}
function Badge({ className, variant = "filled", theme = "primary", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "fwr:inline-flex fwr:items-center fwr:rounded-full fwr:border fwr:px-2.5 fwr:py-0.5 fwr:text-xs fwr:font-semibold fwr:transition-colors focus:fwr:outline-hidden focus:fwr:ring-2 focus:fwr:ring-ring focus:fwr:ring-offset-2",
        themeVariantClasses[theme][variant],
        className
      )}
      {...props}
    />
  );
}
export { Badge, themeVariantClasses };
