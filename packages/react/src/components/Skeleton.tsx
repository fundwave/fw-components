import React from "react";

import { cn } from "../utils/tailwind";

const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return <div className={cn("fwr:animate-pulse fwr:rounded-md fwr:bg-muted", className)} {...rest} />;
};

export default Skeleton;
