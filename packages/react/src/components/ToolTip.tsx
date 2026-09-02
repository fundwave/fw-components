import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import Button from "./Button";

import { ModalManager } from "../providers/ModalManager";
import type { IconComponent } from "../types";
import { cn } from "../utils/tailwind";

const TooltipProviderPresenceContext = React.createContext(false);

function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipProviderPresenceContext.Provider value={true}>
      <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
    </TooltipProviderPresenceContext.Provider>
  );
}

function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const hasAncestorProvider = React.useContext(TooltipProviderPresenceContext);
  const root = <TooltipPrimitive.Root {...props} />;

  // Only fall back to a self-contained provider when the consumer hasn't set one up higher in
  // the tree - otherwise this would shadow an app-level TooltipProvider's delayDuration /
  // skipDelayDuration config and stop tooltips from sharing hover-grouping behavior.
  return hasAncestorProvider ? root : <TooltipProvider>{root}</TooltipProvider>;
}

function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger {...props} />;
}

interface TooltipContentProps extends React.ComponentProps<typeof TooltipPrimitive.Content> {
  mountContainer?: HTMLElement;
}

function TooltipContent({ className, sideOffset = 4, mountContainer, style, children, ...props }: TooltipContentProps) {

  // Sits above the highest currently-open RightSideModal/CenterModal (ModalManager.baseZIndex
  // and beyond), otherwise a tooltip triggered from within a modal renders behind it.
  const zIndex = Math.max(50, ModalManager.getMaxZIndex() + 10);

  return (
    <TooltipPrimitive.Portal container={mountContainer}>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        style={{ zIndex, ...style }}
        className={cn(
          "fwr:w-fit fwr:overflow-hidden fwr:rounded-md fwr:border fwr:border-border fwr:bg-popover fwr:px-3 fwr:py-1.5 fwr:text-xs fwr:text-popover-foreground fwr:shadow-md fwr:animate-in fwr:data-[state=closed]:animate-out fwr:data-[state=closed]:fade-out-0 fwr:data-[state=open]:fade-in-0 fwr:data-[state=closed]:zoom-out-95 fwr:data-[state=open]:zoom-in-95 fwr:data-[side=bottom]:slide-in-from-top-2 fwr:data-[side=left]:slide-in-from-right-2 fwr:data-[side=right]:slide-in-from-left-2 fwr:data-[side=top]:slide-in-from-bottom-2 fwr:origin-[--radix-tooltip-content-transform-origin]",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="fwr:fill-popover" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

interface TooltipIconButtonProps extends Omit<React.ComponentPropsWithRef<typeof Button>, "title"> {
  tooltip: string | React.ReactNode;
  title?: string;
  side?: "top" | "bottom" | "left" | "right";
  icon?: IconComponent;
}

const TooltipIconButton = React.forwardRef<React.ElementRef<typeof Button>, TooltipIconButtonProps>(({ tooltip, title, side = "top", icon, disabled, className, ...props }, ref) => {
  const accessibleTitle = title ? title : typeof tooltip === "string" ? tooltip : undefined;
  const button = <Button mode="icon" icon={icon} ref={ref} variant="ghost" size="md" disabled={disabled} {...props} title={accessibleTitle} className={cn("fwr:p-1", disabled && "fwr:pointer-events-none", className)} />;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {disabled ? (
          <span className="fwr:inline-flex" tabIndex={0}>
            {button}
          </span>
        ) : (
          button
        )}
      </TooltipTrigger>
      <TooltipContent side={side}>{tooltip}</TooltipContent>
    </Tooltip>
  );
});
TooltipIconButton.displayName = "TooltipIconButton";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, TooltipIconButton };
export type { TooltipContentProps, TooltipIconButtonProps };
