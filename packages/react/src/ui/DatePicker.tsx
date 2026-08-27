import * as React from "react";
import { CalendarIcon } from "lucide-react";

import Button from "./Button";
import { Calendar } from "./Calendar";
import { Input } from "./Input";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}
export function Calendar28() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date("2025-06-01"));
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));
  return (
    <div className="fwr:flex fwr:flex-col fwr:gap-3">
      <div className="fwr:px-1">Subscription Date</div>
      <div className="fwr:relative fwr:flex fwr:gap-2">
        <Input
          id="date"
          value={value}
          placeholder="June 01, 2025"
          className="fwr:bg-background fwr:pr-10"
          onChange={(value) => {
            const date = new Date(value);
            setValue(value);
            if (isValidDate(date)) {
              setDate(date);
              setMonth(date);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="fwr:absolute fwr:top-1/2 fwr:right-2 fwr:size-6 fwr:-translate-y-1/2"
              title="Select date"
              icon={CalendarIcon}
              mode="icon"
            ></Button>
          </PopoverTrigger>
          <PopoverContent className="fwr:w-auto fwr:overflow-hidden fwr:p-0" align="end" alignOffset={-8} sideOffset={10}>
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={(date) => {
                setDate(date);
                setValue(formatDate(date));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
