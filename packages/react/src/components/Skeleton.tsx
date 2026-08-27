import React from "react";

import { cn } from "../utils/tailwind";

const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return <div className={cn("fwui:animate-pulse fwui:rounded-md fwui:bg-gray-200", className)} {...rest} />;
};

export default Skeleton;
