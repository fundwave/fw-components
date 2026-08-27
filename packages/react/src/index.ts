import tailwindStyles from "./styles/index.css?inline";

export type { ComponentVariant, ComponentSize, ComponentVariant as ButtonVariant, ComponentTheme as ButtonTheme, BadgeTheme, BadgeVariant, StatCardTheme } from "./types";

// Theme configuration
export { default as themeColors } from "./config/theme";

// Utility functions
export { cn } from "./utils/tailwind";
export { tailwindStyles };
