/* eslint-disable no-unused-vars */
import { cn } from '@/lib/utils.ts';
import {
  Select as SelectShadcn,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { forwardRef } from 'react';

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
  value?: string;
  onChange?(value: string): void;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ className, error, placeholder, options, value, onChange }, ref) => {
    function handleSelect(selectedValue: string) {
      onChange?.(selectedValue);
    }

    return (
      <SelectShadcn onValueChange={handleSelect} value={value || undefined}>
        <SelectTrigger
          ref={ref}
          className={cn(
            'bg-transparent rounded-lg w-full border border-zinc-800 px-3 py-2 h-12 text-zinc-100 placeholder-shown:pt-0 focus:border-zinc-800 transition-all outline-none text-left relative',
            error && '!border-red-900',
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="z-[99] overflow-hidden rounded-2xl border-zinc-800 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="p-2 text-zinc-100 text-sm data-[state=checked]:font-bold data-[highlighted]:bg-zinc-900 data-[highlighted]:text-zinc-100 outline-none rounded-lg transition-colors"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectShadcn>
    );
  },
);

Select.displayName = 'Select';
