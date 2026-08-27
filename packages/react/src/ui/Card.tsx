import * as React from "react";

import { cn } from "../utils/tailwind";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("fwr:rounded-lg fwr:border fwr:bg-background fwr:text-foreground fwr:shadow-sm", className)} {...props} />
));
Card.displayName = "Card";
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("fwr:flex fwr:flex-col fwr:space-y-1.5 fwr:p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("fwr:text-2xl fwr:font-semibold fwr:leading-none fwr:tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("fwr:text-sm fwr:text-muted-foreground", className)} {...props} />
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("fwr:p-6 fwr:pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("fwr:flex fwr:items-center fwr:p-6 fwr:pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
