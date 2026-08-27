import React from "react";
import type { IconProps } from "react-feather";

import Button, { ButtonProps } from "./Button";

import { cn } from "../utils/tailwind";

export interface EmptyStateProps {
  header: string;
  subheader: string;
  actionProps: ButtonProps;
  className?: string;
  icon?: React.ComponentType<
    IconProps & {
      className?: string;
    }
  >;
  iconClassName?: string;
}
const EmptyState: React.FC<EmptyStateProps> = ({ header, subheader, actionProps, className = "", icon: IconComponent, iconClassName = "" }) => {
  return (
    <div className={cn("fwr:flex fwr:flex-col fwr:items-center fwr:p-8 fwr:text-center fwr:mx-auto", className ? className : "bg-background rounded-md border border-border shadow-sm")}>
      {IconComponent && (
        <div className="fwr:mb-4">
          <IconComponent className={cn("fwr:w-12 fwr:h-12 fwr:text-muted-foreground", iconClassName)} />
        </div>
      )}

      <h3 className="fwr:mb-2 fwr:text-foreground fwr:font-semibold">{header}</h3>

      <p className="fwr:mb-6 fwr:text-muted-foreground fwr:max-w-[80%]">{subheader}</p>

      <Button {...actionProps} className="fwr:empty-state-action" />
    </div>
  );
};
export default EmptyState;
