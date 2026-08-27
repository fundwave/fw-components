import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import Button, { themeVariantClasses } from "./Button";

import { cn } from "../utils/tailwind";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "fwr:bg-background fwr:group/calendar fwr:p-3 [--cell-size:fwr:--spacing(8)] [[data-slot=card-content]_&]:fwr:bg-transparent [[data-slot=popover-content]_&]:fwr:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", {
            month: "short"
          }),
        ...formatters
      }}
      classNames={{
        root: cn("fwr:w-fit", defaultClassNames.root),
        months: cn("fwr:flex fwr:gap-4 fwr:flex-col md:fwr:flex-row fwr:relative", defaultClassNames.months),
        month: cn("fwr:flex fwr:flex-col fwr:w-full fwr:gap-4", defaultClassNames.month),
        nav: cn("fwr:flex fwr:items-center fwr:gap-1 fwr:w-full fwr:absolute fwr:top-0 fwr:inset-x-0 fwr:justify-between", defaultClassNames.nav),
        button_previous: cn(
          themeVariantClasses["secondary"][buttonVariant],
          "fwr:size-(--cell-size) aria-disabled:fwr:opacity-50 fwr:p-0 fwr:select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          themeVariantClasses["secondary"][buttonVariant],
          "fwr:size-(--cell-size) aria-disabled:fwr:opacity-50 fwr:p-0 fwr:select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn("fwr:flex fwr:items-center fwr:justify-center fwr:h-(--cell-size) fwr:w-full fwr:px-(--cell-size)", defaultClassNames.month_caption),
        dropdowns: cn("fwr:w-full fwr:flex fwr:items-center fwr:text-sm fwr:font-medium fwr:justify-center fwr:h-(--cell-size) fwr:gap-1.5", defaultClassNames.dropdowns),
        dropdown_root: cn(
          "fwr:relative has-focus:fwr:border-ring fwr:border fwr:border-input fwr:shadow-xs has-focus:fwr:ring-ring/50 has-focus:fwr:ring-[3px] fwr:rounded-md",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("fwr:absolute fwr:bg-popover fwr:inset-0 fwr:opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "fwr:select-none fwr:font-medium",
          captionLayout === "label" ? "text-sm" : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("fwr:flex", defaultClassNames.weekdays),
        weekday: cn("fwr:text-muted-foreground fwr:rounded-md fwr:flex-1 fwr:font-normal fwr:text-[0.8rem] fwr:select-none", defaultClassNames.weekday),
        week: cn("fwr:flex fwr:w-full fwr:mt-2", defaultClassNames.week),
        week_number_header: cn("fwr:select-none fwr:w-(--cell-size)", defaultClassNames.week_number_header),
        week_number: cn("fwr:text-[0.8rem] fwr:select-none fwr:text-muted-foreground", defaultClassNames.week_number),
        day: cn(
          "fwr:relative fwr:w-full fwr:h-full fwr:p-0 fwr:text-center [&:last-child[data-selected=true]_button]:fwr:rounded-r-md fwr:group/day fwr:aspect-square fwr:select-none",
          props.showWeekNumber ? "[&:nth-child(2)[data-selected=true]_button]:rounded-l-md" : "[&:first-child[data-selected=true]_button]:rounded-l-md",
          defaultClassNames.day
        ),
        range_start: cn("fwr:rounded-l-md fwr:bg-accent", defaultClassNames.range_start),
        range_middle: cn("fwr:rounded-none", defaultClassNames.range_middle),
        range_end: cn("fwr:rounded-r-md fwr:bg-accent", defaultClassNames.range_end),
        today: cn("fwr:bg-accent fwr:text-accent-foreground fwr:rounded-md data-[selected=true]:fwr:rounded-none", defaultClassNames.today),
        outside: cn("fwr:text-muted-foreground aria-selected:fwr:text-muted-foreground", defaultClassNames.outside),
        disabled: cn("fwr:text-muted-foreground fwr:opacity-50", defaultClassNames.disabled),
        hidden: cn("fwr:invisible", defaultClassNames.hidden),
        ...classNames
      }}
      components={{
        Root: ({ className, rootRef, ...props }: { className?: string; rootRef?: React.Ref<HTMLDivElement>; [key: string]: unknown }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }: { className?: string; orientation?: "left" | "right" | "up" | "down"; [key: string]: unknown }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={cn("fwr:size-4", className)} {...props} />;
          }
          if (orientation === "right") {
            return <ChevronRightIcon className={cn("fwr:size-4", className)} {...props} />;
          }
          return <ChevronDownIcon className={cn("fwr:size-4", className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="fwr:flex fwr:size-(--cell-size) fwr:items-center fwr:justify-center fwr:text-center">{children}</div>
            </td>
          );
        },
        ...components
      }}
      {...props}
    />
  );
}
function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle}
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:fwr:bg-accent data-[selected-single=true]:fwr:text-accent-foreground data-[range-middle=true]:fwr:bg-accent data-[range-middle=true]:fwr:text-accent-foreground data-[range-start=true]:fwr:bg-accent data-[range-start=true]:fwr:text-accent-foreground data-[range-end=true]:fwr:bg-accent data-[range-end=true]:fwr:text-accent-foreground group-data-[focused=true]/day:fwr:border-ring group-data-[focused=true]/day:fwr:ring-ring/50 dark:hover:fwr:text-accent-foreground fwr:flex fwr:aspect-square fwr:size-auto fwr:w-full fwr:min-w-(--cell-size) fwr:flex-col fwr:gap-1 fwr:leading-none fwr:font-normal group-data-[focused=true]/day:fwr:relative group-data-[focused=true]/day:fwr:z-10 group-data-[focused=true]/day:fwr:ring-[3px] data-[range-end=true]:fwr:rounded-md data-[range-end=true]:fwr:rounded-r-md data-[range-middle=true]:fwr:rounded-none data-[range-start=true]:fwr:rounded-md data-[range-start=true]:fwr:rounded-l-md [&>span]:fwr:text-xs [&>span]:fwr:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}
export { Calendar, CalendarDayButton };
