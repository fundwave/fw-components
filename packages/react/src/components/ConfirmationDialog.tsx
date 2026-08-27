import { Info, LucideIcon, Trash } from "lucide-react";
import React, { createContext, FC, ReactNode, useContext, useState } from "react";

export enum ConfirmationType {
  INFO = "info",
  WARNING = "warning",
  SEVERE = "severe",
  SUCCESS = "success"
}

interface ConfirmationContextType {
  confirm: (_message: string, _title?: string, _label?: string, _type?: ConfirmationType, _icon?: LucideIcon) => Promise<boolean>;
  confirmDelete: (_message: string, _title?: string) => Promise<boolean>;
  isOpen: boolean;
  message: string;
  title: string;
  label: string;
  type: string;
  icon: LucideIcon;
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
  const [icon, setIcon] = useState<LucideIcon>(Info);
  const [resolveRef, setResolveRef] = useState<((_value: boolean) => void) | null>(null);

  const confirm = (message: string, title = "Confirm", label?: string, type?: ConfirmationType, icon?: LucideIcon): Promise<boolean> => {
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

  const confirmDelete = (message: string, title = "Delete"): Promise<boolean> => {
    return confirm(message, title, "Delete", ConfirmationType.SEVERE, Trash);
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

const ConfirmationDialog: React.FC = () => {
  const { isOpen, title, message, label, type, icon: Icon, onConfirm, onCancel } = useConfirmation();

  const getIconContainerClass = () => {
    switch (type) {
      case ConfirmationType.SEVERE:
        return "fwui:bg-red-100";
      case ConfirmationType.WARNING:
        return "fwui:bg-amber-100";
      case ConfirmationType.SUCCESS:
        return "fwui:bg-green-100";
      case ConfirmationType.INFO:
      default:
        return "fwui:bg-blue-100";
    }
  };

  const getIconClass = () => {
    switch (type) {
      case ConfirmationType.SEVERE:
        return "fwui:text-red-600";
      case ConfirmationType.WARNING:
        return "fwui:text-amber-600";
      case ConfirmationType.SUCCESS:
        return "fwui:text-green-600";
      case ConfirmationType.INFO:
      default:
        return "fwui:text-blue-600";
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case ConfirmationType.SEVERE:
        return "fwui:bg-red-600 fwui:hover:bg-red-700 fwui:focus:ring-red-500";
      case ConfirmationType.WARNING:
        return "fwui:bg-amber-600 fwui:hover:bg-amber-700 fwui:focus:ring-amber-500";
      case ConfirmationType.SUCCESS:
        return "fwui:bg-green-600 fwui:hover:bg-green-700 fwui:focus:ring-green-500";
      case ConfirmationType.INFO:
      default:
        return "fwui:bg-blue-600 fwui:hover:bg-blue-700 fwui:focus:ring-blue-500";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fwui:fixed fwui:inset-0 fwui:overflow-y-auto fwui:z-[1020]">
      <div className="fwui:flex fwui:items-end fwui:justify-center fwui:min-h-screen fwui:pt-4 fwui:px-4 fwui:pb-20 fwui:text-center fwui:sm:block fwui:sm:p-0">
        <div className="fwui:fixed fwui:inset-0 fwui:transition-opacity" aria-hidden="true">
          <div className="fwui:absolute fwui:inset-0 fwui:bg-gray-900 fwui:opacity-75"></div>
        </div>

        <span className="fwui:hidden fwui:sm:inline-block fwui:sm:align-middle fwui:sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="fwui:inline-block fwui:align-bottom fwui:bg-white fwui:rounded-lg fwui:text-left fwui:overflow-hidden fwui:shadow-xl fwui:transform fwui:transition-all fwui:sm:my-8 fwui:sm:align-middle fwui:sm:max-w-lg fwui:sm:w-full fwui:relative fwui:z-50">
          <div className="fwui:bg-white fwui:px-4 fwui:pt-5 fwui:pb-4 fwui:sm:p-6 fwui:sm:pb-4">
            <div className="fwui:sm:flex fwui:sm:items-start">
              <div
                className={`fwui:mx-auto fwui:flex-shrink-0 fwui:flex fwui:items-center fwui:justify-center fwui:h-12 fwui:w-12 fwui:rounded-full ${getIconContainerClass()} fwui:sm:mx-0 fwui:sm:h-10 fwui:sm:w-10`}
              >
                <Icon className={`h-6 w-6 ${getIconClass()}`} />
              </div>
              <div className="fwui:mt-3 fwui:text-center fwui:sm:mt-0 fwui:sm:ml-4 fwui:sm:text-left">
                <h3 className="fwui:text-lg fwui:leading-6 fwui:font-medium fwui:text-gray-900">{title}</h3>
                <div className="fwui:mt-2">
                  <p className="fwui:text-sm fwui:text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="fwui:bg-gray-50 fwui:px-4 fwui:py-3 fwui:sm:px-6 fwui:sm:flex fwui:sm:flex-row-reverse">
            <button
              type="button"
              onClick={onConfirm}
              className={`fwui:w-full fwui:inline-flex fwui:justify-center fwui:rounded-md fwui:border fwui:border-transparent fwui:shadow-sm fwui:px-4 fwui:py-2 fwui:text-base fwui:font-medium fwui:text-white fwui:focus:outline-none fwui:focus:ring-2 fwui:focus:ring-offset-2 fwui:sm:ml-3 fwui:sm:w-auto fwui:sm:text-sm ${getButtonClass()}`}
            >
              {label || "Confirm"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="fwui:mt-3 fwui:w-full fwui:inline-flex fwui:justify-center fwui:rounded-md fwui:border fwui:border-gray-300 fwui:shadow-sm fwui:px-4 fwui:py-2 fwui:bg-white fwui:text-base fwui:font-medium fwui:text-gray-700 fwui:hover:bg-gray-50 fwui:focus:outline-none fwui:focus:ring-2 fwui:focus:ring-offset-2 fwui:focus:ring-blue-500 fwui:sm:mt-0 fwui:sm:ml-3 fwui:sm:w-auto fwui:sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
