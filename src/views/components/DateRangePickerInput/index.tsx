'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { type DateRange } from 'react-day-picker';
import { format, differenceInDays, addDays } from 'date-fns';

import { Button } from '@/views/components/ui/button';
import { Calendar } from '@/views/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/views/components/ui/popover';
import { cn } from '@/lib/utils';

const MAX_RANGE_DAYS = 90;

export interface DateRangePickerInputProps {
  value?: DateRange;
  onChange?: (_range: DateRange | undefined) => void;
  className?: string;
  showApplyButton?: boolean;
}

export function DateRangePickerInput({
  value,
  onChange,
  className,
  showApplyButton = false,
}: DateRangePickerInputProps) {
  const [open, setOpen] = React.useState(false);
  const [internalRange, setInternalRange] = React.useState<DateRange | undefined>(value);

  // Sincroniza o estado interno quando o valor externo muda e o popover está fechado
  React.useEffect(() => {
    if (!open) {
      setInternalRange(value);
    }
  }, [value, open]);

  const disabledMatcher = React.useCallback(
    (date: Date) => {
      if (!internalRange?.from || internalRange?.to) return false;

      const diffFromStart = differenceInDays(date, internalRange.from);
      return diffFromStart > MAX_RANGE_DAYS || diffFromStart < -MAX_RANGE_DAYS;
    },
    [internalRange?.from, internalRange?.to],
  );

  const handleSelect = React.useCallback(
    (range: DateRange | undefined) => {
      setInternalRange(range);

      if (!showApplyButton && range?.from && range?.to) {
        onChange?.(range);
        setOpen(false);
      }
    },
    [onChange, showApplyButton],
  );

  const handleApply = React.useCallback(() => {
    onChange?.(internalRange);
    setOpen(false);
  }, [onChange, internalRange]);

  const handleOpenChange = React.useCallback(
    (isOpen: boolean) => {
      setOpen(isOpen);

      // Ao fechar sem aplicar, restaura o valor externo
      if (!isOpen) {
        setInternalRange(value);
      }
    },
    [value],
  );

  const displayRange = open ? internalRange : value;

  const formatLabel = () => {
    if (!displayRange?.from) return 'Selecione o período';

    if (!displayRange.to) return format(displayRange.from, 'dd/MM/yyyy');

    return `${format(displayRange.from, 'dd/MM/yyyy')} - ${format(displayRange.to, 'dd/MM/yyyy')}`;
  };

  const canApply = internalRange?.from && internalRange?.to;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-auto justify-start font-normal gap-2',
            !displayRange?.from && 'text-muted-foreground',
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
          selected={internalRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          defaultMonth={internalRange?.from ? addDays(internalRange.from, -1) : undefined}
          disabled={disabledMatcher}
        />
        {showApplyButton && (
          <div className="flex justify-end p-3 pt-0">
            <Button className="w-max" size="sm" onClick={handleApply} disabled={!canApply}>
              Filtrar
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
