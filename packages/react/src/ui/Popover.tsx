import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as React from "react";

import { cn } from "../utils/tailwind";

function Popover({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}
function PopoverTrigger({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}
function PopoverContent({ className, align = "center", sideOffset = 4, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "fwr:bg-popover fwr:text-popover-foreground data-[state=open]:fwr:animate-in data-[state=closed]:fwr:animate-out data-[state=closed]:fwr:fade-out-0 data-[state=open]:fwr:fade-in-0 data-[state=closed]:fwr:zoom-out-95 data-[state=open]:fwr:zoom-in-95 data-[side=bottom]:fwr:slide-in-from-top-2 data-[side=left]:fwr:slide-in-from-right-2 data-[side=right]:fwr:slide-in-from-left-2 data-[side=top]:fwr:slide-in-from-bottom-2 fwr:z-50 fwr:w-72 fwr:origin-(--radix-popover-content-transform-origin) fwr:rounded-md fwr:border fwr:p-4 fwr:shadow-md fwr:outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}
function PopoverAnchor({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
