import * as React from "react";

import { cn } from "~/utils/tailwind";

const Table = React.forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement> & {
    containerClassName?: string;
  }
>(({ className, containerClassName, ...props }, ref) => (
  <div className={cn("fwr:relative fwr:w-full fwr:overflow-auto", containerClassName)}>
    <table ref={ref} className={cn("fwr:w-full fwr:caption-bottom fwr:text-sm", className)} {...props} />
  </div>
));
Table.displayName = "Table";
const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:fwr:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:fwr:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("fwr:border-t fwr:bg-muted/50 fwr:font-medium [&>tr]:last:fwr:border-b-0", className)} {...props} />
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("fwr:border-b fwr:transition-colors hover:fwr:bg-muted/50 data-[state=selected]:fwr:bg-muted", className)} {...props} />
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn("fwr:h-10 fwr:px-2 fwr:text-left fwr:align-middle fwr:font-medium", className)} {...props} />
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn("fwr:p-2 fwr:align-middle fwr:text-wrap", className)} {...props} />
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("fwr:mt-4 fwr:text-sm fwr:text-muted-foreground", className)} {...props} />
));
TableCaption.displayName = "TableCaption";
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
