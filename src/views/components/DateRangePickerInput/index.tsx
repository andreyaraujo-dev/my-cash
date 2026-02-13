'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { type DateRange } from 'react-day-picker';
import { format, differenceInDays, addDays } from 'date-fns';

import { Button } from '@/views/components/ui/button';
import { Calendar } from '@/views/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/views/components/ui/popover';
import { cn } from '@/lib/utils';

const MAX_RANGE_DAYS = 90;

export interface DateRangePickerInputProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  className?: string;
}

export function DateRangePickerInput({
  value,
  onChange,
  className,
}: DateRangePickerInputProps) {
  const [open, setOpen] = React.useState(false);

  const disabledMatcher = React.useCallback(
    (date: Date) => {
      if (!value?.from || value?.to) return false;

      const diffFromStart = differenceInDays(date, value.from);
      return diffFromStart > MAX_RANGE_DAYS || diffFromStart < -MAX_RANGE_DAYS;
    },
    [value?.from, value?.to],
  );

  const handleSelect = React.useCallback(
    (range: DateRange | undefined) => {
      onChange?.(range);

      if (range?.from && range?.to) {
        setOpen(false);
      }
    },
    [onChange],
  );

  const formatLabel = () => {
    if (!value?.from) return 'Selecione o período';

    if (!value.to) return format(value.from, 'dd/MM/yyyy');

    return `${format(value.from, 'dd/MM/yyyy')} - ${format(value.to, 'dd/MM/yyyy')}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-auto justify-start font-normal gap-2',
            !value?.from && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className="size-4" />
          {formatLabel()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[9999]" align="end">
        <Calendar
          mode="range"
          selected={value}
          onSelect={handleSelect}
          numberOfMonths={2}
          defaultMonth={value?.from ? addDays(value.from, -1) : undefined}
          disabled={disabledMatcher}
        />
      </PopoverContent>
    </Popover>
  );
}
