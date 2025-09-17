/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils.ts';
import {
  Select as SelectShadcn,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

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

export function Select({ className, error, placeholder, options, value, onChange }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value ?? '');

  useEffect(() => {
    setSelectedValue(value ?? '');
  }, [value]);

  function handleSelect(value: string) {
    setSelectedValue(value);
    onChange?.(value);
  }

  const selectedOption = options.find((option) => option.value === selectedValue);
  const displayValue = selectedOption?.label || '';

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            'absolute z-10 top-1/2 -translate-y-1/2 left-3 text-zinc-300 pointer-events-none',
            selectedValue && 'text-xs left-[13px] top-2 transition-all translate-y-0',
          )}
        >
          {placeholder}
        </label>

        <SelectShadcn onValueChange={handleSelect} value={value}>
          <SelectTrigger
            className={cn(
              'bg-transparent rounded-lg w-full border border-zinc-800 px-3 py-1 h-9 text-zinc-100 placeholder-shown:pt-0 focus:border-zinc-800 transition-all outline-none text-left relative',
              error && '!border-red-900',
              className,
            )}
          >
            <SelectValue>{displayValue}</SelectValue>
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
      </div>
    </div>
  );
}
