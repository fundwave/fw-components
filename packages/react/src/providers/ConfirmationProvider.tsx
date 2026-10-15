import { Info, Trash } from "lucide-react";
import React, { createContext, ReactNode, useContext, useRef, useState } from "react";

import type { IconComponent } from "../types";

export enum ConfirmationType {
  INFO = "info",
  WARNING = "warning",
  SEVERE = "severe",
  SUCCESS = "success"
}

interface ConfirmationContextType {
  confirm: (_message: string, _title?: string, _label?: string, _type?: ConfirmationType, _icon?: IconComponent) => Promise<boolean>;
  confirmDelete: (_message: string, _title?: string) => Promise<boolean>;
  isOpen: boolean;
  message: string;
  title: string;
  label: string;
  type: string;
  icon: IconComponent;
  onConfirm: () => void;
  onCancel: () => void;
}

interface ConfirmationProviderProps {
  children: ReactNode;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error("useConfirmation must be used within a ConfirmationProvider");
  }
  return context;
};

export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Confirm");
  const [label, setLabel] = useState("Confirm");
  const [type, setType] = useState(ConfirmationType.INFO);
  const [icon, setIcon] = useState<IconComponent>(Info);
  const resolveRef = useRef<((_value: boolean) => void) | null>(null);

  const confirm = (message: string, title = "Confirm", label?: string, type?: ConfirmationType, icon?: IconComponent): Promise<boolean> => {
    if (resolveRef.current) {
      resolveRef.current(false);
      resolveRef.current = null;
    }

    setMessage(message);
    setTitle(title);
    setIcon(icon ?? Info);
    setLabel(label ?? "Confirm");
    setType(type ?? ConfirmationType.INFO);

    setIsOpen(true);

    return new Promise<boolean>((resolve) => {
      resolveRef.current = resolve;
    });
  };

  const confirmDelete = (message: string, title = "Delete"): Promise<boolean> => {
    return confirm(message, title, "Delete", ConfirmationType.SEVERE, Trash);
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(true);
      resolveRef.current = null;
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolveRef.current) {
      resolveRef.current(false);
      resolveRef.current = null;
    }
  };

  return (
    <ConfirmationContext.Provider
      value={{
        confirm,
        confirmDelete,
        isOpen,
        message,
        title,
        label,
        type,
        icon,
        onConfirm: handleConfirm,
        onCancel: handleCancel
      }}
    >
      {children}
    </ConfirmationContext.Provider>
  );
};
