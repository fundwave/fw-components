import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const ModalManager = {
  stack: new Map<string, number>(),
  baseZIndex: 192,

  register(id: string): number {
    const currentMaxZ = this.getMaxZIndex();
    const newZ = currentMaxZ + 10;
    this.stack.set(id, newZ);
    return newZ;
  },

  unregister(id: string): void {
    this.stack.delete(id);
  },

  getMaxZIndex(): number {
    if (this.stack.size === 0) return this.baseZIndex;
    return Math.max(...this.stack.values());
  },

  isTopModal(id: string): boolean {
    if (this.stack.size === 0) return false;
    const entries = Array.from(this.stack.entries());
    const sorted = entries.sort((a, b) => b?.[1] - a?.[1]);
    return sorted?.[0]?.[0] === id;
  },

  generateUniqueId(prefix = "modal"): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
  }
};

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: string;
  disableOutsideClick?: boolean;
  zIndex?: number;
  position?: "right" | "center";
  contentPadding?: string;
  mountContainer?: HTMLElement;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = "fwui:w-[95%] fwui:md:w-1/2 fwui:xl:w-1/3",
  disableOutsideClick = false,
  zIndex = ModalManager.baseZIndex,
  position = "right",
  contentPadding = "fwui:p-4",
  mountContainer = document.body
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalId = useRef(ModalManager.generateUniqueId()).current;
  const [modalZIndex, setModalZIndex] = useState(zIndex);

  useEffect(() => {
    if (isOpen) {
      const newZIndex = ModalManager.register(modalId);
      setModalZIndex(newZIndex);
    } else if (modalId) {
      ModalManager.unregister(modalId);
    }

    return () => {
      if (modalId) {
        ModalManager.unregister(modalId);
      }
    };
  }, [isOpen, modalId]);

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

  return createPortal(
    <div
      className="fwui:fixed fwui:inset-0 fwui:overflow-hidden fwui:isolation"
      style={{
        zIndex: modalZIndex,
        display: isOpen ? "block" : "none"
      }}
    >
      <div className="fwui:fixed fwui:inset-0 fwui:bg-black/30" aria-hidden="true" onClick={handleBackdropClick} />

      <div className={`fwui:fixed fwui:inset-0 ${isCenter ? "fwui:flex fwui:items-center fwui:justify-center" : "fwui:flex fwui:justify-end"}`}>
        <div
          ref={modalRef}
          className={`fwui:transform fwui:transition fwui:duration-300 fwui:ease-in-out ${
            isCenter
              ? `${width} fwui:bg-white fwui:shadow-xl fwui:rounded-lg fwui:max-h-[90vh] fwui:pointer-events-auto`
              : `fwui:h-full ${width} fwui:bg-white fwui:shadow-xl fwui:pointer-events-auto`
          }`}
        >
          <div className={`${isCenter ? "" : "fwui:h-full"} fwui:flex fwui:flex-col`}>
            <div className="fwui:px-4 fwui:py-3 fwui:border-b fwui:border-gray-200 fwui:flex fwui:items-center fwui:justify-between fwui:gap-2">
              <div className="fwui:flex fwui:flex-col fwui:flex-1 fwui:min-w-0">
                <h2 className="fwui:text-lg fwui:font-medium fwui:text-gray-900 fwui:truncate">{title}</h2>
                {subtitle && <div className="fwui:text-sm fwui:text-gray-500 fwui:truncate fwui:mt-0.5">{subtitle}</div>}
              </div>
              {onClose && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="fwui:text-gray-400 fwui:hover:text-gray-500 fwui:focus-visible:outline-hidden"
                >
                  <X className="fwui:size-5" />
                </button>
              )}
            </div>
            <div className={`fwui:flex-1 fwui:overflow-y-auto ${contentPadding}`}>{children}</div>
          </div>
        </div>
      </div>
    </div>,
    mountContainer
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
