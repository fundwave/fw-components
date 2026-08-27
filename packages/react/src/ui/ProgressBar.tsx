import React from "react";

import { cn } from "~/utils/tailwind";

interface ProgressBarProps {
  className?: string;
  color?: string;
}
const ProgressBar: React.FC<ProgressBarProps> = ({ className, color = "bg-accent" }) => {
  return (
    <div className={cn("fwr:w-full fwr:bg-muted fwr:rounded-md fwr:overflow-hidden fwr:h-1", className)}>
      <div className={cn("fwr:w-full fwr:h-full fwr:animate-progress fwr:origin-left-right", color)} />
    </div>
  );
};
export default ProgressBar;
