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
            'bg-transparent rounded-lg w-full border border-border px-3 py-2 h-12 text-foreground placeholder-shown:pt-0 focus:border-border transition-all outline-none text-left relative',
            error && '!border-red-900',
            className,
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="z-[99] overflow-hidden rounded-2xl border-border shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="p-2 text-foreground text-sm data-[state=checked]:font-bold data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground outline-none rounded-lg transition-colors"
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
