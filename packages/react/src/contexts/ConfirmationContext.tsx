import React, { createContext, FC, ReactNode, useContext, useState } from "react";
import { Icon, Info, Trash } from "react-feather";

interface ConfirmationContextType {
  confirm: (message: string, title?: string, label?: string, type?: ConfirmationType, icon?: FC) => Promise<boolean>;
  confirmDelete: (message: string, title?: string) => Promise<boolean>;
  isOpen: boolean;
  message: string;
  title: string;
  label: string;
  type: string;
  icon: Icon;
  onConfirm: () => void;
  onCancel: () => void;
}
const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);
export const useConfirmation = () => {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error("useConfirmation must be used within a ConfirmationProvider");
  }
  return context;
};
interface ConfirmationProviderProps {
  children: ReactNode;
}
export enum ConfirmationType {
  INFO = "info",
  WARNING = "warning",
  SEVERE = "severe",
  SUCCESS = "success"
}
export const ConfirmationProvider: React.FC<ConfirmationProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Confirm");
  const [label, setLabel] = useState("Confirm");
  const [type, setType] = useState(ConfirmationType.INFO);
  const [icon, setIcon] = useState<Icon>(Info);
  const [resolveRef, setResolveRef] = useState<((value: boolean) => void) | null>(null);
  const confirmDelete = (message: string, title = "Delete"): Promise<boolean> => {
    return confirm(message, title, "Delete", ConfirmationType.SEVERE, Trash);
  };
  const confirm = (message: string, title = "Confirm", label?: string, type?: ConfirmationType, icon?: Icon): Promise<boolean> => {
    setMessage(message);
    setTitle(title);
    if (icon) setIcon(icon);
    if (label) setLabel(label);
    if (type) setType(type);
    setIsOpen(true);
    return new Promise<boolean>((resolve) => {
      setResolveRef(() => resolve);
    });
  };
  const handleConfirm = () => {
    setIsOpen(false);
    if (resolveRef) {
      resolveRef(true);
      setResolveRef(null);
    }
  };
  const handleCancel = () => {
    setIsOpen(false);
    if (resolveRef) {
      resolveRef(false);
      setResolveRef(null);
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
