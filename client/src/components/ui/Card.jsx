import React from 'react';
import { cn } from '../../utils/cn';

export const Card = ({ className, children, hover = true, ...props }) => {
  return (
    <div 
      className={cn(
        "bg-surface border border-border rounded-xl p-6 md:p-8 overflow-hidden relative",
        hover && "transition-all duration-500 hover:border-primary/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/5",
        className
      )}
      {...props}
    >
      {/* Subtle glass effect accent on hover if desired, mostly managed by tailwind classes above */}
      {children}
    </div>
  );
};

export const CardHeader = ({ className, children, ...props }) => (
  <div className={cn("mb-4", className)} {...props}>{children}</div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn("font-display text-card-heading font-semibold text-primary", className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }) => (
  <p className={cn("text-small text-primary/70 mt-2 leading-relaxed", className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={cn("", className)} {...props}>{children}</div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div className={cn("mt-6 pt-4 border-t border-border flex items-center", className)} {...props}>
    {children}
  </div>
);
