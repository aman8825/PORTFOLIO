import React from 'react';
import { cn } from '../../utils/cn';

export const Heading = ({ 
  level = 1, 
  children, 
  className,
  as,
  ...props 
}) => {
  const Component = as || `h${level}`;
  
  const baseStyles = "font-display font-semibold tracking-tight text-primary";
  
  const sizeStyles = {
    1: "text-hero-heading leading-[1.05] tracking-tighter",
    2: "text-section-heading leading-[1.1] tracking-tight",
    3: "text-large-heading leading-[1.15] tracking-tight",
    4: "text-card-heading leading-[1.2]",
    5: "text-xl leading-[1.2]",
    6: "text-lg leading-[1.2]",
  };

  return (
    <Component className={cn(baseStyles, sizeStyles[level], className)} {...props}>
      {children}
    </Component>
  );
};

export const Text = ({
  children,
  className,
  variant = 'base',
  as = 'p',
  ...props
}) => {
  const Component = as;
  
  const variants = {
    base: "text-body text-primary/80 leading-relaxed",
    muted: "text-small text-primary/60 leading-relaxed",
    large: "text-lg md:text-xl text-primary/90 leading-relaxed",
    mono: "font-mono text-small text-primary/70",
  };

  return (
    <Component className={cn(variants[variant], className)} {...props}>
      {children}
    </Component>
  );
};
