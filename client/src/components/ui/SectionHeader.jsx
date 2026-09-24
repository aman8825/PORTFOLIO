import React from 'react';
import { cn } from '../../utils/cn';
import { Heading, Text } from './Typography';

export const SectionHeader = ({ title, description, className, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-4 mb-12 md:mb-16", className)} {...props}>
      <Heading level={2} className="relative inline-block w-fit">
        {title}
        {/* Subtle accent line for high tech feel */}
        <span className="absolute -bottom-2 left-0 w-1/3 h-[2px] bg-primary"></span>
      </Heading>
      {description && (
        <Text variant="large" className="max-w-2xl mt-4">
          {description}
        </Text>
      )}
    </div>
  );
};
