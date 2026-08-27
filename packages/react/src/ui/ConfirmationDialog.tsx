import React from "react";

import { ConfirmationType, useConfirmation } from "../contexts/ConfirmationContext";

const ConfirmationDialog: React.FC = () => {
  const { isOpen, title, message, label, type, icon: Icon, onConfirm, onCancel } = useConfirmation();
  const getIconContainerClass = () => {
    switch (type) {
      case ConfirmationType.SEVERE:
        return "bg-destructive/10";
      case ConfirmationType.WARNING:
        return "bg-accent/10";
      case ConfirmationType.SUCCESS:
        return "bg-accent/10";
      case ConfirmationType.INFO:
      default:
        return "bg-accent/10";
    }
  };
  const getIconClass = () => {
    switch (type) {
      case ConfirmationType.SEVERE:
        return "text-destructive";
      case ConfirmationType.WARNING:
        return "text-accent-foreground";
      case ConfirmationType.SUCCESS:
        return "text-accent-foreground";
      case ConfirmationType.INFO:
      default:
        return "text-accent";
    }
  };
  const getButtonClass = () => {
    switch (type) {
      case ConfirmationType.SEVERE:
        return "bg-destructive hover:bg-destructive/90 focus:ring-ring";
      case ConfirmationType.WARNING:
        return "bg-accent hover:bg-accent/90 focus:ring-ring";
      case ConfirmationType.SUCCESS:
        return "bg-accent hover:bg-accent/90 focus:ring-ring";
      case ConfirmationType.INFO:
      default:
        return "bg-accent hover:bg-accent/90 focus:ring-ring";
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fwr:fixed fwr:inset-0 fwr:overflow-y-auto fwr:z-[1020]">
      <div className="fwr:flex fwr:items-end fwr:justify-center fwr:min-h-screen fwr:pt-4 fwr:px-4 fwr:pb-20 fwr:text-center sm:fwr:block sm:fwr:p-0">
        <div className="fwr:fixed fwr:inset-0 fwr:transition-opacity" aria-hidden="true">
          <div className="fwr:absolute fwr:inset-0 fwr:bg-background/80 fwr:backdrop-blur-sm"></div>
        </div>

        <span className="fwr:hidden sm:fwr:inline-block sm:fwr:align-middle sm:fwr:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="fwr:inline-block fwr:align-bottom fwr:bg-white fwr:rounded-lg fwr:text-left fwr:overflow-hidden fwr:shadow-sm-xl fwr:transform fwr:transition-all sm:fwr:my-8 sm:fwr:align-middle sm:fwr:max-w-lg sm:fwr:w-full fwr:relative fwr:z-50">
          <div className="fwr:bg-white fwr:px-4 fwr:pt-5 fwr:pb-4 sm:fwr:p-6 sm:fwr:pb-4">
            <div className="sm:fwr:flex sm:fwr:items-start">
              <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${getIconContainerClass()} sm:mx-0 sm:h-10 sm:w-10`}>
                <Icon className={`h-6 w-6 ${getIconClass()}`} />
              </div>
              <div className="fwr:mt-3 fwr:text-center sm:fwr:mt-0 sm:fwr:ml-4 sm:fwr:text-left">
                <h3 className="fwr:text-lg fwr:leading-6 fwr:font-medium fwr:text-foreground">{title}</h3>
                <div className="fwr:mt-2">
                  <p className="fwr:text-sm fwr:text-muted-foreground">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="fwr:bg-muted fwr:px-4 fwr:py-3 sm:fwr:px-6 sm:fwr:flex sm:fwr:flex-row-reverse">
            <button
              type="button"
              onClick={onConfirm}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-hidden focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${getButtonClass()}`}
            >
              {label || "Confirm"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="fwr:mt-3 fwr:w-full fwr:inline-flex fwr:justify-center fwr:rounded-md fwr:border fwr:border-input fwr:shadow-sm fwr:px-4 fwr:py-2 fwr:bg-background fwr:text-base fwr:font-medium fwr:text-foreground hover:fwr:bg-muted focus:fwr:outline-hidden focus:fwr:ring-2 focus:fwr:ring-offset-2 focus:fwr:ring-ring sm:fwr:mt-0 sm:fwr:ml-3 sm:fwr:w-auto sm:fwr:text-sm"
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
