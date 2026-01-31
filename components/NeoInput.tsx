import React from 'react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const NeoInput = React.forwardRef<HTMLInputElement, NeoInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && <label className="text-sm font-bold uppercase">{label}</label>}
        <input
          ref={ref}
          className={cn(
            'bg-white border-[3px] border-black p-3 font-bold placeholder:text-gray-500 focus:outline-none focus:shadow-brutal transition-all w-full rounded-none',
            error && 'border-retro-red',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-retro-red font-bold">{error}</span>}
      </div>
    );
  }
);
NeoInput.displayName = 'NeoInput';
