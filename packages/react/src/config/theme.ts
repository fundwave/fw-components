import { cn } from "../utils/tailwind";

const baseThemeClasses = {
  primary: "fwr:bg-transparent fwr:border fwr:border-transparent hover:fwr:bg-accent/10 focus:fwr:bg-accent/10 focus:fwr:ring-accent",
  secondary: "fwr:bg-transparent fwr:border fwr:border-transparent hover:fwr:bg-base/80 focus:fwr:bg-base/80 focus:fwr:ring-base",
  danger: "fwr:bg-transparent fwr:border fwr:border-transparent hover:fwr:bg-destructive/10 focus:fwr:bg-destructive/10 focus:fwr:ring-destructive"
};
export const themeVariantClasses = {
  filled: {
    primary: cn(baseThemeClasses["primary"], "fwr:bg-accent fwr:text-accent-foreground fwr:shadow-sm hover:fwr:bg-accent/90 focus:fwr:bg-accent/90"),
    secondary: cn(baseThemeClasses["secondary"], "fwr:bg-base fwr:text-base-foreground fwr:shadow-sm hover:fwr:bg-base/80 focus:fwr:bg-base/80"),
    danger: cn(baseThemeClasses["danger"], "fwr:bg-destructive fwr:text-destructive-foreground fwr:shadow-sm hover:fwr:bg-destructive/90 focus:fwr:bg-destructive/90")
  },
  outlined: {
    primary: cn(baseThemeClasses["primary"], "fwr:text-accent fwr:border-accent fwr:shadow-sm hover:fwr:text-accent hover:fwr:bg-accent/10"),
    secondary: cn(baseThemeClasses["secondary"], "fwr:text-base fwr:border-base fwr:shadow-sm hover:fwr:bg-base/80"),
    danger: cn(baseThemeClasses["danger"], "fwr:text-destructive fwr:border-destructive fwr:shadow-sm hover:fwr:bg-destructive/10")
  },
  plain: {
    primary: cn(baseThemeClasses["primary"], "fwr:text-accent hover:fwr:text-accent"),
    secondary: cn(baseThemeClasses["secondary"], "fwr:text-base hover:fwr:bg-base/80"),
    danger: cn(baseThemeClasses["danger"], "fwr:text-destructive hover:fwr:text-destructive")
  },
  ghost: {
    primary: "fwr:border fwr:border-transparent fwr:text-foreground hover:fwr:text-accent hover:fwr:border-accent",
    secondary: "fwr:border fwr:border-transparent fwr:text-foreground hover:fwr:text-base hover:fwr:border-base",
    danger: "fwr:border fwr:border-transparent fwr:text-foreground hover:fwr:text-destructive hover:fwr:border-destructive"
  }
};
export const componentSizeClasses = {
  sm: "fwr:text-xs fwr:px-2 fwr:py-0.5 fwr:gap-1",
  md: "fwr:text-sm fwr:px-3 fwr:py-2 fwr:gap-2",
  lg: "fwr:text-base fwr:px-4 fwr:py-3 fwr:gap-2"
};
export const iconComponentSizeClasses = {
  sm: "fwr:p-1.5",
  md: "fwr:p-1.5",
  lg: "fwr:p-2"
};
export const iconSizeClasses = {
  sm: "fwr:w-3.5 fwr:h-3.5",
  md: "fwr:w-4 fwr:h-4",
  lg: "fwr:w-5 fwr:h-5"
};
export const textTheme = {
  filled: {
    primary: "fwr:text-accent-foreground",
    secondary: "fwr:text-base-foreground",
    danger: "fwr:text-destructive-foreground"
  },
  outlined: {
    primary: "fwr:text-accent",
    secondary: "fwr:text-base",
    danger: "fwr:text-destructive"
  },
  ghost: {
    primary: "fwr:text-accent",
    secondary: "fwr:text-base",
    danger: "fwr:text-destructive"
  },
  plain: {
    primary: "fwr:text-accent",
    secondary: "fwr:text-base",
    danger: "fwr:text-destructive"
  }
};
