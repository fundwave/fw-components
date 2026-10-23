import type { OnChangeFn } from "@tanstack/react-table";
import { useCallback, useState } from "react";

/**
 * Hook for managing controlled/uncontrolled state pattern.
 * When a controlled value is provided, it takes precedence.
 * Otherwise, manages internal state with optional onChange notification.
 */
export function useControlledState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: OnChangeFn<T>
): [T, OnChangeFn<T>] {
  const [uncontrolledState, setUncontrolledState] = useState<T>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledState;

  const setValue = useCallback<OnChangeFn<T>>(
    (updater) => {
      if (!isControlled) {
        setUncontrolledState((prev) =>
          typeof updater === "function" ? (updater as (prev: T) => T)(prev) : updater
        );
      }
      // Notify outside the state updater (which must stay pure) and forward the
      // original updater so callers can resolve it against their own state.
      onChange?.(updater);
    },
    [isControlled, onChange]
  );

  return [value, setValue];
}
