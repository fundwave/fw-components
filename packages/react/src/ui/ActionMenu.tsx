import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Icon, MoreVertical, Search } from "react-feather";

import { ConfirmationType, useConfirmation } from "../contexts/ConfirmationContext";

import Button, { ButtonProps, themeVariantClasses } from "./Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./DropdownMenu";
import { ZIndexManager } from "./Modal";

export interface Action {
  label: string;
  description?: string;
  icon?: Icon;
  theme?: ButtonProps["theme"];
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent) => Promise<void> | void;
  confirmation?: {
    message: string;
    title?: string;
    label?: string;
    type?: ConfirmationType;
    icon?: Icon;
  };
}
interface ActionMenuProps {
  actions: Action[];
  className?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  hideTrigger?: boolean;
  triggerButton?: Omit<ButtonProps, "onClick">;
  menuProps?: React.ComponentProps<typeof DropdownMenuContent>;
  onClick?: (action: Action, e?: React.MouseEvent) => Promise<void> | void;
  rootElement?: HTMLElement;
}
export interface ActionMenuRef {
  opened: boolean;
  open: () => void;
  close: () => void;
  setAnchorElement: (element: HTMLElement | null) => void;
}
export const ActionMenu = forwardRef<ActionMenuRef, ActionMenuProps>(
  ({ actions, className, searchable = false, searchPlaceholder = "Search...", onClick, triggerButton = {}, hideTrigger = false, menuProps = {}, rootElement }, ref) => {
    const menuId = React.useId();
    const [open, setOpen] = useState(false);
    const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
    const { confirm } = useConfirmation();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
    const [zIndex, setZIndex] = useState<number>(ZIndexManager.baseZIndex);
    const defaultTriggerButton: ButtonProps = {
      mode: "icon",
      theme: "secondary",
      icon: MoreVertical,
      title: "Actions"
    };
    const triggerButtonProps: ButtonProps = {
      ...defaultTriggerButton,
      ...triggerButton
    };
    React.useEffect(() => {
      return () => {
        setAnchorElement(null);
        ZIndexManager.unregister(menuId);
      };
    }, []);
    useImperativeHandle(
      ref,
      () => ({
        opened: open,
        open: () => handleOpenChange(true),
        close: () => handleOpenChange(false),
        setAnchorElement: (element: HTMLElement | null) => setAnchorElement(element)
      }),
      [open]
    );
    const filteredActions = searchTerm.trim() === "" ? actions : actions.filter((action) => action.label.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleOpenChange = (open: boolean) => {
      handleZIndexChange(open);
      setOpen(open);
      if (!open) setSearchTerm("");
      if (!open) setLoadingIndex(null);
    };
    const handleZIndexChange = (open: boolean) => {
      if (open) {
        const newZ = ZIndexManager.register(menuId);
        setZIndex(newZ);
      } else {
        ZIndexManager.unregister(menuId);
        setZIndex(ZIndexManager.baseZIndex);
      }
    };
    const handleAction = async (e: React.MouseEvent, action: Action, index: number) => {
      e.preventDefault();
      e.stopPropagation();
      if (action.confirmation) {
        handleOpenChange(false);
        const { message, title, label, type, icon } = action.confirmation;
        const confirmed = await confirm(message, title, label, type, icon);
        if (!confirmed) return;
        handleOpenChange(true);
      }
      setLoadingIndex(index);
      try {
        if (action.onClick) {
          await action.onClick(e);
        } else {
          await onClick?.(action, e);
        }
      } catch (err) {
        console.error("Error executing action:", err);
      } finally {
        setLoadingIndex(null);
        handleOpenChange(false);
      }
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };
    return (
      <DropdownMenu open={open} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger
          anchorRef={
            anchorElement
              ? {
                  current: anchorElement
                }
              : undefined
          }
          asChild
        >
          {hideTrigger ? <span /> : <Button {...triggerButtonProps} />}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={0}
          style={{
            zIndex: zIndex
          }}
          {...menuProps}
          container={rootElement}
          asChild
        >
          <div>
            {searchable && (
              <div className="fwr:px-3 fwr:py-2 fwr:sticky fwr:top-0 fwr:bg-popover fwr:z-10 fwr:border-b fwr:border-border">
                <div className="fwr:relative">
                  <Search className="fwr:absolute fwr:left-2 fwr:top-1/2 fwr:transform fwr:-translate-y-1/2 fwr:w-4 fwr:h-4 fwr:text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="fwr:w-full fwr:pl-8 fwr:pr-2 fwr:py-1 fwr:border fwr:border-input fwr:rounded-md fwr:text-sm focus:fwr:outline-hidden focus:fwr:ring-1 focus:fwr:ring-ring fwr:bg-background fwr:text-foreground"
                    placeholder={searchPlaceholder}
                    onClick={(e) => e.stopPropagation()}
                    autoFocus
                  />
                </div>
              </div>
            )}
            {filteredActions.length === 0 && searchTerm !== "" && (
              <DropdownMenuItem disabled className="fwr:italic fwr:text-sm fwr:cursor-default">
                No results found
              </DropdownMenuItem>
            )}
            {filteredActions.map((action, index) => (
              <DropdownMenuItem
                key={index}
                onClick={(e: React.MouseEvent) => handleAction(e, action, index)}
                className={action.theme ? `${themeVariantClasses[action.theme]["plain"]} gap-2` : "gap-2"}
                disabled={action.disabled || loadingIndex !== null}
              >
                {loadingIndex === index && <div className="fwr:w-4 fwr:h-4 fwr:border-2 fwr:border-t-transparent fwr:border-accent fwr:rounded-full fwr:animate-spin"></div>}
                {action.icon && loadingIndex !== index && React.createElement(action.icon)}
                <div className="fwr:flex fwr:flex-col">
                  <span>{action.label}</span>
                  {action.description && <span className="fwr:text-xs fwr:text-muted-foreground fwr:mt-0.5">{action.description}</span>}
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);
ActionMenu.displayName = "ActionMenu";
