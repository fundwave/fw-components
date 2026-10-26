import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Column } from "@tanstack/react-table";
import type { CSSProperties } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getColumnPinningStyles<TData>(column: Column<TData, unknown>): CSSProperties {
  const isPinned = column.getIsPinned();
  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : 0,
  };
}

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

export const getNestedRowPadding = (depth: number): string | undefined => {
  if (depth === 0) return undefined;
  const baseIndentRem = 0.5;
  const depthStepRem = 1.15;
  return `${baseIndentRem + depth * depthStepRem}rem`;
};
