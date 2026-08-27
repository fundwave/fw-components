import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as React from "react";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "../utils/tailwind";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> & {
    anchorRef?: React.RefObject<HTMLElement>;
  }
>(({ className, anchorRef, children, ...props }, ref) => {
  if (!anchorRef) {
    return (
      <DropdownMenuPrimitive.Trigger ref={ref} className={className} {...props}>
        {children}
      </DropdownMenuPrimitive.Trigger>
    );
  }

  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const updatePosition = () => {
      if (anchorRef?.current && triggerRef.current) {
        const anchorRect = anchorRef.current.getBoundingClientRect();
        const offsetParent = triggerRef.current.offsetParent as HTMLElement | null;
        let left = anchorRect.left;
        let top = anchorRect.top;
        let position = "fixed";

        if (offsetParent) {
          const parentRect = offsetParent.getBoundingClientRect();
          left = anchorRect.left - parentRect.left;
          top = anchorRect.top - parentRect.top;
          position = "absolute";
        }

        triggerRef.current.style.position = position;
        triggerRef.current.style.left = `${left}px`;
        triggerRef.current.style.top = `${top}px`;
        triggerRef.current.style.width = `${anchorRect.width}px`;
        triggerRef.current.style.height = `${anchorRect.height}px`;
        triggerRef.current.style.padding = "0";
        triggerRef.current.style.margin = "0";
        triggerRef.current.style.pointerEvents = "none";
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true); // Capture phase to catch all scroll events

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [anchorRef]);

  return (
    <DropdownMenuPrimitive.Trigger ref={triggerRef} className={cn("fwui:opacity-0", className)} {...props}>
      <span></span>
    </DropdownMenuPrimitive.Trigger>
  );
});
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "fwui:flex fwui:cursor-default fwui:select-none fwui:items-center fwui:rounded-sm fwui:px-2 fwui:py-1.5 fwui:text-sm fwui:outline-none fwui:focus:bg-accent fwui:data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="fwui:ml-auto fwui:h-4 fwui:w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.SubContent>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>>(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "fwui:z-50 fwui:min-w-[8rem] fwui:overflow-hidden fwui:rounded-md fwui:border fwui:bg-popover fwui:p-1 fwui:text-popover-foreground fwui:shadow-lg fwui:data-[state=open]:animate-in fwui:data-[state=closed]:animate-out fwui:data-[state=closed]:fade-out-0 fwui:data-[state=open]:fade-in-0 fwui:data-[state=closed]:zoom-out-95 fwui:data-[state=open]:zoom-in-95 fwui:data-[side=bottom]:slide-in-from-top-2 fwui:data-[side=left]:slide-in-from-right-2 fwui:data-[side=right]:slide-in-from-left-2 fwui:data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
);
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
    container?: HTMLElement;
  }
>(({ className, sideOffset = 4, container, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal container={container}>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "fwui:z-50 fwui:min-w-[8rem] fwui:overflow-hidden fwui:rounded-md fwui:border fwui:border-input fwui:bg-popover fwui:p-1 fwui:text-popover-foreground fwui:shadow-md fwui:data-[state=open]:animate-in fwui:data-[state=closed]:animate-out fwui:data-[state=closed]:fade-out-0 fwui:data-[state=open]:fade-in-0 fwui:data-[state=closed]:zoom-out-95 fwui:data-[state=open]:zoom-in-95 fwui:data-[side=bottom]:slide-in-from-top-2 fwui:data-[side=left]:slide-in-from-right-2 fwui:data-[side=right]:slide-in-from-left-2 fwui:data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "fwui:relative fwui:flex fwui:cursor-default fwui:select-none fwui:items-center fwui:rounded-sm fwui:px-2 fwui:py-1.5 fwui:text-sm fwui:outline-none fwui:transition-colors fwui:focus:bg-accent fwui:focus:text-accent-foreground fwui:data-[disabled]:pointer-events-none fwui:data-[disabled]:opacity-50",
      inset && "fwui:pl-8",
      className
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "fwui:relative fwui:flex fwui:cursor-default fwui:select-none fwui:items-center fwui:rounded-sm fwui:py-1.5 fwui:pl-8 fwui:pr-2 fwui:text-sm fwui:outline-none fwui:transition-colors fwui:focus:bg-accent fwui:focus:text-accent-foreground fwui:data-[disabled]:pointer-events-none fwui:data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="fwui:absolute fwui:left-2 fwui:flex fwui:h-3.5 fwui:w-3.5 fwui:items-center fwui:justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="fwui:h-4 fwui:w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>>(
  ({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        "fwui:relative fwui:flex fwui:cursor-default fwui:select-none fwui:items-center fwui:rounded-sm fwui:py-1.5 fwui:pl-8 fwui:pr-2 fwui:text-sm fwui:outline-none fwui:transition-colors fwui:focus:bg-accent fwui:focus:text-accent-foreground fwui:data-[disabled]:pointer-events-none fwui:data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="fwui:absolute fwui:left-2 fwui:flex fwui:h-3.5 fwui:w-3.5 fwui:items-center fwui:justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="fwui:h-2 fwui:w-2 fwui:fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
);
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label ref={ref} className={cn("fwui:px-2 fwui:py-1.5 fwui:text-sm fwui:font-semibold", inset && "fwui:pl-8", className)} {...props} />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>>(
  ({ className, ...props }, ref) => <DropdownMenuPrimitive.Separator ref={ref} className={cn("fwui:-mx-1 fwui:my-1 fwui:h-px fwui:bg-muted", className)} {...props} />
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("fwui:ml-auto fwui:text-xs fwui:tracking-widest fwui:opacity-60", className)} {...props} />;
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup
};
