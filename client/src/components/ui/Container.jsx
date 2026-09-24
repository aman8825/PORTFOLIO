import React from 'react';
import { cn } from '../../utils/cn';

export const Container = ({ className, children, as = 'div', ...props }) => {
  const Component = as;
  return (
    <Component 
      className={cn("w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20", className)} 
      {...props}
    >
      {children}
    </Component>
  );
};
