import React from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const NeoCard = React.forwardRef<HTMLDivElement, NeoCardProps>(
  ({ className, hoverEffect = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border-[3px] border-black shadow-brutal p-4 rounded-none',
          hoverEffect && 'hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer',
          className
        )}
        {...props}
      />
    );
  }
);
NeoCard.displayName = 'NeoCard';
