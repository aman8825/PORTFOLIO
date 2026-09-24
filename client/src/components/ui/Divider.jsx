import React from 'react';
import { cn } from '../../utils/cn';

export const Divider = ({ className, vertical = false, ...props }) => {
  return (
    <div 
      className={cn(
        "bg-border",
        vertical ? "w-[1px] h-full" : "w-full h-[1px]",
        className
      )}
      {...props}
    />
  );
};
