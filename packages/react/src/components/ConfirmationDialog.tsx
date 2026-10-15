import React from "react";

import { ConfirmationType, useConfirmation } from "../providers/ConfirmationProvider";

const ConfirmationDialog: React.FC = () => {
  const { isOpen, title, message, label, type, icon: Icon, onConfirm, onCancel } = useConfirmation();

  const getIconContainerClass = () => {
    switch (type) {
      case ConfirmationType.SEVERE:
        return "fwr:bg-destructive/10";
      case ConfirmationType.WARNING:
        return "fwr:bg-amber-100";
      case ConfirmationType.SUCCESS:
        return "fwr:bg-green-100";
      case ConfirmationType.INFO:
      default:
        return "fwr:bg-primary/10";
    }
  };

  const getIconClass = () => {
    switch (type) {
      case ConfirmationType.SEVERE:
        return "fwr:text-destructive";
      case ConfirmationType.WARNING:
        return "fwr:text-amber-600";
      case ConfirmationType.SUCCESS:
        return "fwr:text-green-600";
      case ConfirmationType.INFO:
      default:
        return "fwr:text-primary";
    }
  };

  const getButtonClass = () => {
    switch (type) {
      case ConfirmationType.SEVERE:
        return "fwr:text-destructive-foreground fwr:bg-destructive fwr:hover:bg-destructive/90 fwr:focus:ring-destructive";
      case ConfirmationType.WARNING:
        return "fwr:text-white fwr:bg-amber-600 fwr:hover:bg-amber-700 fwr:focus:ring-amber-500";
      case ConfirmationType.SUCCESS:
        return "fwr:text-white fwr:bg-green-600 fwr:hover:bg-green-700 fwr:focus:ring-green-500";
      case ConfirmationType.INFO:
      default:
        return "fwr:text-primary-foreground fwr:bg-primary fwr:hover:bg-primary/90 fwr:focus:ring-primary";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fwr:fixed fwr:inset-0 fwr:overflow-y-auto fwr:z-[1020]">
      <div className="fwr:flex fwr:items-end fwr:justify-center fwr:min-h-screen fwr:pt-4 fwr:px-4 fwr:pb-20 fwr:text-center fwr:sm:block fwr:sm:p-0">
        <div className="fwr:fixed fwr:inset-0 fwr:transition-opacity" aria-hidden="true">
          <div className="fwr:absolute fwr:inset-0 fwr:bg-gray-900 fwr:opacity-75"></div>
        </div>

        <span className="fwr:hidden fwr:sm:inline-block fwr:sm:align-middle fwr:sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="fwr:inline-block fwr:align-bottom fwr:bg-background fwr:rounded-lg fwr:text-left fwr:overflow-hidden fwr:shadow-xl fwr:transform fwr:transition-all fwr:sm:my-8 fwr:sm:align-middle fwr:sm:max-w-lg fwr:sm:w-full fwr:relative fwr:z-50">
          <div className="fwr:bg-background fwr:px-4 fwr:pt-5 fwr:pb-4 fwr:sm:p-6 fwr:sm:pb-4">
            <div className="fwr:sm:flex fwr:sm:items-start">
              <div
                className={`fwr:mx-auto fwr:flex-shrink-0 fwr:flex fwr:items-center fwr:justify-center fwr:h-12 fwr:w-12 fwr:rounded-full ${getIconContainerClass()} fwr:sm:mx-0 fwr:sm:h-10 fwr:sm:w-10`}
              >
                <Icon className={`h-6 w-6 ${getIconClass()}`} />
              </div>
              <div className="fwr:mt-3 fwr:text-center fwr:sm:mt-0 fwr:sm:ml-4 fwr:sm:text-left">
                <h3 className="fwr:text-lg fwr:leading-6 fwr:font-medium fwr:text-foreground">{title}</h3>
                <div className="fwr:mt-2">
                  <p className="fwr:text-sm fwr:text-muted-foreground">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="fwr:bg-muted fwr:px-4 fwr:py-3 fwr:sm:px-6 fwr:sm:flex fwr:sm:flex-row-reverse">
            <button
              type="button"
              tabIndex={1}
              onClick={onConfirm}
              className={`fwr:w-full fwr:inline-flex fwr:justify-center fwr:rounded-md fwr:border fwr:border-transparent fwr:shadow-sm fwr:px-4 fwr:py-2 fwr:text-base fwr:font-medium fwr:focus:outline-none fwr:focus:ring-2 fwr:focus:ring-offset-2 fwr:sm:ml-3 fwr:sm:w-auto fwr:sm:text-sm ${getButtonClass()}`}
            >
              {label || "Confirm"}
            </button>
            <button
              type="button"
              tabIndex={1}
              onClick={onCancel}
              className="fwr:mt-3 fwr:w-full fwr:inline-flex fwr:justify-center fwr:rounded-md fwr:border fwr:border-border fwr:shadow-sm fwr:px-4 fwr:py-2 fwr:bg-background fwr:text-base fwr:font-medium fwr:text-foreground fwr:hover:bg-muted fwr:focus:outline-none fwr:focus:ring-2 fwr:focus:ring-offset-2 fwr:focus:ring-primary fwr:sm:mt-0 fwr:sm:ml-3 fwr:sm:w-auto fwr:sm:text-sm"
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
