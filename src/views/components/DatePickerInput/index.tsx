'use client';

import * as React from 'react';
import { Button } from '@/views/components/ui/button';
import { Calendar } from '@/views/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/views/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export interface DatePickerInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  error?: string;
  value?: Date;
  onChange?: (_date: Date | undefined) => void;
}

export function DatePickerInput({
  error,
  value,
  onChange,
  className,
  ...rest
}: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false);
  const date = value;
  const setDate = React.useCallback(
    (date: Date | undefined) => {
      onChange?.(date);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <div className={cn(className)} {...rest}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start font-normal h-12',
              error && 'border-destructive text-destructive',
            )}
          >
            {date ? format(date, 'dd/MM/yyyy') : <span>Selecione uma data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-[9999]" align="start" data-datepicker-content>
          <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={date} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
