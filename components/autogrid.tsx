import { cn } from '@/lib/utils';
import React from 'react';

export const AutoGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'grid grid-cols-[repeat(auto-fit,300px)] justify-center justify-items-center gap-x-2 gap-y-3',
      className,
    )}
    {...props}
  />
));
AutoGrid.displayName = 'AutoGrid';
