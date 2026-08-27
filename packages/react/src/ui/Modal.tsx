import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "react-feather";

import { cn } from "../utils/tailwind";

export const ZIndexManager = {
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
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  width?: string;
  disableOutsideClick?: boolean;
  zIndex?: number;
  position?: "right" | "center";
  contentPadding?: string;
  mountElement?: HTMLElement;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  width = "w-[95%] md:w-1/2 xl:w-1/3",
  disableOutsideClick = false,
  zIndex = ZIndexManager.baseZIndex,
  position = "right",
  contentPadding = "p-4",
  mountElement = document.body
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const modalId = useRef(ZIndexManager.generateUniqueId()).current;
  const [modalZIndex, setModalZIndex] = useState(zIndex);
  useEffect(() => {
    if (isOpen) {
      const newZIndex = ZIndexManager.register(modalId);
      setModalZIndex(newZIndex);
    } else if (modalId) {
      ZIndexManager.unregister(modalId);
    }
    return () => {
      if (modalId) {
        ZIndexManager.unregister(modalId);
      }
    };
  }, [isOpen, modalId]);
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && onClose && event.key === "Escape" && ZIndexManager.isTopModal(modalId)) {
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
      className="fwr:fixed fwr:inset-0 fwr:overflow-hidden fwr:isolation"
      style={{
        zIndex: modalZIndex,
        display: isOpen ? "block" : "none"
      }}
    >
      <div className="fwr:fixed fwr:inset-0 fwr:bg-black/30 fwr:backdrop-blur-sm" aria-hidden="true" onClick={handleBackdropClick} />

      <div className={`fixed inset-0 ${isCenter ? "flex items-center justify-center" : "flex justify-end"}`}>
        <div
          ref={modalRef}
          className={`transform transition duration-300 ease-in-out ${isCenter ? `${width} bg-background shadow-xl rounded-lg max-h-[90vh] pointer-events-auto` : `h-full ${width} bg-background shadow-xl pointer-events-auto`}`}
        >
          <div className={cn(`${isCenter ? "max-h-[90vh]" : "h-full"} flex flex-col`, className)}>
            <div className="fwr:px-4 fwr:py-3 fwr:border-b fwr:border-border fwr:flex fwr:items-center fwr:justify-between">
              <h2 className="fwr:text-lg fwr:font-medium fwr:text-foreground">{title}</h2>
              {onClose && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="fwr:text-muted-foreground hover:fwr:text-foreground focus-visible:fwr:outline-hidden fwr:transition-colors"
                >
                  <X className="fwr:size-5" />
                </button>
              )}
            </div>
            <div className={`flex-1 overflow-y-auto ${contentPadding}`}>{children}</div>
          </div>
        </div>
      </div>
    </div>,
    mountElement
  );
};
const RightSideModal: React.FC<Omit<ModalProps, "position">> = (props) => {
  return <Modal {...props} position="right" />;
};
const CenterModal: React.FC<Omit<ModalProps, "position">> = (props) => {
  return <Modal {...props} position="center" />;
};
export { CenterModal, RightSideModal };
export default Modal;
