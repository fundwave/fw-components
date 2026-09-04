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
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!anchorRef) return;

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

  if (!anchorRef) {
    return (
      <DropdownMenuPrimitive.Trigger ref={ref} className={className} {...props}>
        {children}
      </DropdownMenuPrimitive.Trigger>
    );
  }

  return (
    <DropdownMenuPrimitive.Trigger ref={triggerRef} className={cn("fwr:opacity-0", className)} {...props}>
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
      "fwr:flex fwr:cursor-default fwr:select-none fwr:items-center fwr:rounded-sm fwr:px-2 fwr:py-1.5 fwr:text-sm fwr:outline-none fwr:focus:bg-accent fwr:data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="fwr:ml-auto fwr:h-4 fwr:w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.SubContent>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>>(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "fwr:z-50 fwr:min-w-[8rem] fwr:overflow-hidden fwr:rounded-md fwr:border fwr:bg-popover fwr:p-1 fwr:text-popover-foreground fwr:shadow-lg fwr:data-[state=open]:animate-in fwr:data-[state=closed]:animate-out fwr:data-[state=closed]:fade-out-0 fwr:data-[state=open]:fade-in-0 fwr:data-[state=closed]:zoom-out-95 fwr:data-[state=open]:zoom-in-95 fwr:data-[side=bottom]:slide-in-from-top-2 fwr:data-[side=left]:slide-in-from-right-2 fwr:data-[side=right]:slide-in-from-left-2 fwr:data-[side=top]:slide-in-from-bottom-2 fwr:origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      hideWhenDetached={props.hideWhenDetached ?? true}
      loop={props.loop ?? true}
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
        "fwr:z-50 fwr:max-h-[var(--radix-dropdown-menu-content-available-height)] fwr:min-w-[8rem] fwr:overflow-y-auto fwr:overflow-x-hidden fwr:rounded-md fwr:border fwr:border-border fwr:bg-popover fwr:p-1 fwr:text-popover-foreground fwr:shadow-md fwr:data-[state=open]:animate-in fwr:data-[state=closed]:animate-out fwr:data-[state=closed]:fade-out-0 fwr:data-[state=open]:fade-in-0 fwr:data-[state=closed]:zoom-out-95 fwr:data-[state=open]:zoom-in-95 fwr:data-[side=bottom]:slide-in-from-top-2 fwr:data-[side=left]:slide-in-from-right-2 fwr:data-[side=right]:slide-in-from-left-2 fwr:data-[side=top]:slide-in-from-bottom-2 fwr:origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
      hideWhenDetached={props.hideWhenDetached ?? true}
      loop={props.loop ?? true}
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
      "fwr:relative fwr:flex fwr:cursor-default fwr:select-none fwr:items-center fwr:rounded-sm fwr:px-2 fwr:py-1.5 fwr:text-sm fwr:outline-none fwr:transition-colors fwr:focus:bg-accent fwr:focus:text-accent-foreground fwr:data-[disabled]:pointer-events-none fwr:data-[disabled]:opacity-50",
      inset && "fwr:pl-8",
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
      "fwr:relative fwr:flex fwr:cursor-default fwr:select-none fwr:items-center fwr:rounded-sm fwr:py-1.5 fwr:pl-8 fwr:pr-2 fwr:text-sm fwr:outline-none fwr:transition-colors fwr:focus:bg-accent fwr:focus:text-accent-foreground fwr:data-[disabled]:pointer-events-none fwr:data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="fwr:absolute fwr:left-2 fwr:flex fwr:h-3.5 fwr:w-3.5 fwr:items-center fwr:justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="fwr:h-4 fwr:w-4" />
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
        "fwr:relative fwr:flex fwr:cursor-default fwr:select-none fwr:items-center fwr:rounded-sm fwr:py-1.5 fwr:pl-8 fwr:pr-2 fwr:text-sm fwr:outline-none fwr:transition-colors fwr:focus:bg-accent fwr:focus:text-accent-foreground fwr:data-[disabled]:pointer-events-none fwr:data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="fwr:absolute fwr:left-2 fwr:flex fwr:h-3.5 fwr:w-3.5 fwr:items-center fwr:justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="fwr:h-2 fwr:w-2 fwr:fill-current" />
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
  <DropdownMenuPrimitive.Label ref={ref} className={cn("fwr:px-2 fwr:py-1.5 fwr:text-sm fwr:font-semibold", inset && "fwr:pl-8", className)} {...props} />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>>(
  ({ className, ...props }, ref) => <DropdownMenuPrimitive.Separator ref={ref} className={cn("fwr:-mx-1 fwr:my-1 fwr:h-px fwr:bg-muted", className)} {...props} />
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("fwr:ml-auto fwr:text-xs fwr:tracking-widest fwr:opacity-60", className)} {...props} />;
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
