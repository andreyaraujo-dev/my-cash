/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/views/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import { formatDate } from '@/app/utils/formatDate.ts';
import { DatePicker } from '@/views/components/DatePicker';
import { Calendar } from 'lucide-react';

interface DatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

export function DatePickerInput({ error, value, onChange, className }: DatePickerInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleChangeDate(date: Date) {
    onChange?.(date);
    setIsOpen(false);
  }

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'rounded-lg w-full border pt-4 border-zinc-800 px-3 h-[52px] text-zinc-100 placeholder-shown:pt-0 focus:border-zinc-800 transition-all outline-none text-left relative hover:border-zinc-700',
              error && '!border-red-900',
              !value && 'pt-0 text-zinc-500',
              className,
            )}
          >
            {value && (
              <span className="absolute text-zinc-300 text-xs left-[13px] top-2 pointer-events-none">
                Data
              </span>
            )}
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {value ? formatDate(value) : 'Selecione uma data'}
            </span>
          </button>
        </PopoverTrigger>

        <PopoverContent className="border-zinc-800 w-auto p-3 z-[9999]" align="start">
          <DatePicker value={value ?? new Date()} onChange={handleChangeDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
