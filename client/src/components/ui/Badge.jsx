import React from 'react';
import { cn } from '../../utils/cn';

export const Badge = ({ className, variant = 'default', children, ...props }) => {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors border";
  
  const variants = {
    default: "bg-surface text-primary border-border hover:bg-surface-hover",
    primary: "bg-primary text-background border-transparent",
    outline: "text-primary border-primary/20",
    glow: "bg-primary/5 text-primary border-primary/10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
};
