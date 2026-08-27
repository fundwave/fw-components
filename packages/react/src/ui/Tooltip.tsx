import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "../utils/tailwind";

function TooltipProvider({ delayDuration = 0, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />;
}
function Tooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}
function TooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}
function TooltipContent({
  className,
  sideOffset = 0,
  mountPoint = document.body,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & {
  mountPoint?: HTMLElement;
}) {
  return (
    <TooltipPrimitive.Portal container={mountPoint || document.body}>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "fwr:bg-muted fwr:text-black fwr:animate-in fwr:fade-in-0 fwr:zoom-in-95 data-[state=closed]:fwr:animate-out data-[state=closed]:fwr:fade-out-0 data-[state=closed]:fwr:zoom-out-95 data-[side=bottom]:fwr:slide-in-from-top-2 data-[side=left]:fwr:slide-in-from-right-2 data-[side=right]:fwr:slide-in-from-left-2 data-[side=top]:fwr:slide-in-from-bottom-2 fwr:z-50 fwr:w-fit fwr:origin-(--radix-tooltip-content-transform-origin) fwr:rounded-md fwr:px-3 fwr:py-1.5 fwr:text-xs fwr:text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="fwr:bg-muted fwr:fill-muted fwr:z-50 fwr:size-2.5 fwr:translate-y-[calc(-50%_-_2px)] fwr:rotate-45 fwr:rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
