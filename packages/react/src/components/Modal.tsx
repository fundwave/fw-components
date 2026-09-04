import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ModalManager } from "../providers/ModalManager";
import { cn } from "../utils/tailwind";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  width?: string;
  disableOutsideClick?: boolean;
  zIndex?: number;
  position?: "right" | "center";
  contentPadding?: string;
  mountContainer?: HTMLElement;
  headerActions?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className = "",
  width = "fwr:w-[95%] fwr:md:w-1/2 fwr:xl:w-1/3",
  disableOutsideClick = false,
  zIndex = ModalManager.baseZIndex,
  position = "right",
  contentPadding = "fwr:p-4",
  mountContainer,
  headerActions
}) => {
  const resolvedMountContainer = mountContainer ?? (typeof document !== "undefined" ? document.body : undefined);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalId = useRef(ModalManager.generateUniqueId()).current;
  const [modalZIndex, setModalZIndex] = useState(zIndex);

  useEffect(() => {
    if (isOpen) {
      const newZIndex = ModalManager.register(modalId, zIndex);
      setModalZIndex(newZIndex);
    } else if (modalId) {
      ModalManager.unregister(modalId);
    }

    return () => {
      if (modalId) {
        ModalManager.unregister(modalId);
      }
    };
  }, [isOpen, modalId, zIndex]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && onClose && event.key === "Escape" && ModalManager.isTopModal(modalId)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose, modalId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Remove the conditional return and use display style instead
  // if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (!disableOutsideClick && onClose) {
      e.stopPropagation();
      onClose();
    }
  };

  const isCenter = position === "center";

  if (!resolvedMountContainer) return null;

  return createPortal(
    <div
      className="fwr:fixed fwr:inset-0 fwr:overflow-hidden fwr:isolation"
      style={{
        zIndex: modalZIndex,
        display: isOpen ? "block" : "none"
      }}
      onClick={handleBackdropClick}
    >
      <div className="fwr:fixed fwr:inset-0 fwr:bg-black/30" aria-hidden="true" />

      <div className={`fwr:fixed fwr:inset-0 ${isCenter ? "fwr:flex fwr:items-center fwr:justify-center" : "fwr:flex fwr:justify-end"}`}>
        <div
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
          className={`fwr:transform fwr:transition fwr:duration-300 fwr:ease-in-out ${
            isCenter
              ? `${width} fwr:bg-background fwr:shadow-xl fwr:rounded-lg fwr:max-h-[90vh] fwr:pointer-events-auto`
              : `fwr:h-full ${width} fwr:bg-background fwr:shadow-xl fwr:pointer-events-auto`
          }`}
        >
          <div className={cn(`${isCenter ? "" : "fwr:h-full"} fwr:flex fwr:flex-col`, className)}>
            <div className="fwr:px-4 fwr:py-3 fwr:border-b fwr:border-border fwr:flex fwr:items-center fwr:justify-between fwr:gap-2">
              <div className="fwr:flex fwr:flex-col fwr:flex-1 fwr:min-w-0">
                <h2 className="fwr:text-lg fwr:font-medium fwr:text-foreground fwr:truncate">{title}</h2>
                {subtitle && <div className="fwr:text-sm fwr:text-muted-foreground fwr:truncate fwr:mt-0.5">{subtitle}</div>}
              </div>
              <div className="fwr:flex fwr:items-center fwr:gap-2">
                {headerActions}
                {onClose && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                    }}
                    className="fwr:text-muted-foreground fwr:hover:text-foreground fwr:focus-visible:outline-hidden"
                  >
                    <X className="fwr:size-5" />
                  </button>
                )}
              </div>
            </div>
            <div className={`fwr:flex-1 fwr:overflow-y-auto ${contentPadding}`}>{children}</div>
          </div>
        </div>
      </div>
    </div>,
    resolvedMountContainer
  );
};

const RightSideModal: React.FC<Omit<ModalProps, "position">> = (props) => {
  return <Modal {...props} position="right" />;
};

const CenterModal: React.FC<Omit<ModalProps, "position">> = (props) => {
  return <Modal {...props} position="center" />;
};

export { CenterModal };
export default RightSideModal;
