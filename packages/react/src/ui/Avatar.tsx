import React from "react";

import { getColorForString } from "../utils/color-utils";
import { cn } from "../utils/tailwind";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "small" | "medium" | "large";
  className?: string;
  applyColors?: boolean;
}
const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar", size = "medium", className, applyColors = false }) => {
  const sizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-10 h-10 text-sm",
    large: "w-16 h-16 text-lg"
  };
  const backgroundColor = applyColors ? getColorForString(alt) : undefined;
  const defaultBgClass = applyColors ? "" : "bg-muted";
  return (
    <div
      className={cn("fwr:relative fwr:flex fwr:shrink-0 fwr:overflow-hidden fwr:rounded-full", sizeClasses[size], defaultBgClass, className)}
      style={
        backgroundColor
          ? {
              backgroundColor
            }
          : undefined
      }
      title={alt}
    >
      {src ? (
        <img src={src} alt={alt} className="fwr:aspect-square fwr:h-full fwr:w-full fwr:object-cover" />
      ) : (
        <span className="fwr:flex fwr:h-full fwr:w-full fwr:items-center fwr:justify-center fwr:font-medium">{alt.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};
export default Avatar;
