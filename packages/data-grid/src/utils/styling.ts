// ============================================================================
// UTILITY: cn (className merger)
// ============================================================================

/**
 * Merges class names, filtering out falsy values.
 * A lightweight alternative to clsx + tailwind-merge for this package.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ============================================================================
// COLUMN PINNING STYLES
// ============================================================================

import type { Column } from "@tanstack/react-table";
import type { CSSProperties } from "react";

/**
 * Get CSS styles for pinned columns (sticky positioning)
 */
export function getColumnPinningStyles<TData>(column: Column<TData, unknown>): CSSProperties {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : 0,
  };
}

// ============================================================================
// ALIGNMENT CLASSES
// ============================================================================

/**
 * Get CSS classes for text alignment
 */
export function getAlignmentClasses(align: "left" | "center" | "right" | undefined): {
  textAlign: string;
  justifyContent: string;
} {
  switch (align) {
    case "center":
      return { textAlign: "text-center", justifyContent: "justify-center" };
    case "right":
      return { textAlign: "text-right", justifyContent: "justify-end" };
    case "left":
    default:
      return { textAlign: "text-left", justifyContent: "justify-start" };
  }
}

// ============================================================================
// NESTED ROW PADDING
// ============================================================================

/**
 * Calculate left padding for nested/hierarchical rows
 */
export const getNestedRowPadding = (depth: number): string | undefined => {
  if (depth === 0) return undefined;
  const baseIndentRem = 0.5;
  const depthStepRem = 1.15;
  return `${baseIndentRem + depth * depthStepRem}rem`;
};
