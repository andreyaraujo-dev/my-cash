import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  containerClassName?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, containerClassName, type, startAdornment, endAdornment, ...props }, ref) => {
    return (
      <div className={cn('relative w-full', containerClassName)}>
        {startAdornment && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {startAdornment}
          </div>
        )}

        <input
          type={type}
          className={cn(
            'flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            startAdornment && 'pl-10',
            endAdornment && 'pr-10',
            className,
          )}
          ref={ref}
          {...props}
        />

        {endAdornment && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {endAdornment}
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
