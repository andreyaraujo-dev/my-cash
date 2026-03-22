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
import { CategoryIcon } from '@/views/components/icons/Categories/CategoryIcon';

export interface SelectOption {
  value: string;
  label: string;
  icon?: string;
  type?: 'EXPENSE' | 'INCOME';
}

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
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
          <span className="flex flex-1 items-center gap-2 min-w-0 overflow-hidden">
            <SelectValue placeholder={placeholder} />
          </span>
        </SelectTrigger>

        <SelectContent className="z-[200] overflow-hidden rounded-2xl border-border shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
          {options.length > 0 ? (
            options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="flex items-center gap-2 p-2 text-foreground text-sm data-[state=checked]:font-bold hover:bg-muted/80 outline-none rounded-lg transition-colors duration-150 ease-out cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {option.type && option.icon && (
                    <span className="flex shrink-0">
                      <CategoryIcon type={option.type} category={option.icon} className="h-5 w-5" />
                    </span>
                  )}
                  <span>{option.label}</span>
                </span>
              </SelectItem>
            ))
          ) : (
            <div className="px-3 py-4 text-center text-sm text-muted-foreground">
              Nenhuma opção disponível
            </div>
          )}
        </SelectContent>
      </SelectShadcn>
    );
  },
);

Select.displayName = 'Select';
