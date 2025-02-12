import * as React from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { error?: string; showErrorMessage?: boolean }
>(({ className, type, placeholder, name, id, error, showErrorMessage, ...props }, ref) => {
  const inputId = id ?? name;
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={inputId}
        className={cn(
          'flex h-[52px] w-full rounded-lg border border-zinc-800 bg-transparent text-zinc-100 px-3 placeholder-shown:pt-0 pt-4 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 peer focus:border-zinc-700 outline-none',
          className,
          error && '!border-red-900',
        )}
        name={name}
        ref={ref}
        {...props}
        placeholder=" "
      />

      <label
        htmlFor={inputId}
        className="absolute text-xs left-[13px] top-2 pointer-events-none text-zinc-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
      >
        {placeholder}
      </label>

      {error && showErrorMessage && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs ">{error}</span>
        </div>
      )}
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
