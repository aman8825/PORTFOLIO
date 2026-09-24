import React from 'react';
import { cn } from '../../utils/cn';

export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  children,
  as: Component = 'button',
  ...props
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:opacity-50 disabled:pointer-events-none rounded-md active:scale-[0.98]";
  
  const variants = {
    primary: "bg-primary text-background hover:bg-primary/90 hover:-translate-y-[1px] shadow-sm hover:shadow",
    secondary: "bg-surface border border-border text-primary hover:bg-surface-hover hover:border-primary/30 hover:-translate-y-[1px]",
    ghost: "bg-transparent text-primary/80 hover:text-primary hover:bg-surface",
    link: "bg-transparent text-primary hover:underline underline-offset-4 px-0",
  };
  
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
    icon: "h-10 w-10",
  };

  const finalSize = variant === 'link' ? '' : sizes[size];

  return (
    <Component
      ref={ref}
      className={cn(baseStyles, variants[variant], finalSize, className)}
      {...props}
    >
      {children}
    </Component>
  );
});

Button.displayName = 'Button';
