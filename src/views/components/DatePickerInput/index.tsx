/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/views/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import { formatDate } from '@/app/utils/formatDate.ts';
import { DatePicker } from '@/views/components/DatePicker';

interface DatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

export function DatePickerInput({ error, value, onChange, className }: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger
          className={cn(
            'rounded-lg w-full border pt-4 border-zinc-800 px-3 h-[52px] text-zinc-100 placeholder-shown:pt-0 focus:border-zinc-800 transition-all outline-none text-left relative',
            error && '!border-red-900',
            className,
          )}
        >
          <span className="absolute text-zinc-300 text-xs left-[13px] top-2 pointer-events-none">
            Data
          </span>
          <span>{formatDate(selectedDate)}</span>
        </PopoverTrigger>

        <PopoverContent className="border-zinc-800 w-max">
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
