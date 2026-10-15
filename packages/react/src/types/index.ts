import type { ComponentType } from "react";

/**
 * Structural type matching both lucide-react and react-feather icon components,
 * so consumers can pass either without this package depending on react-feather.
 */
export type IconComponent = ComponentType<{ className?: string; size?: string | number }>;