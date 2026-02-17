/* eslint-disable no-unused-vars */
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { capitalizeFirstLetter } from '@/app/utils/capitalizeFirstLetter.ts';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange(date ?? new Date())}
      classNames={{
        caption: 'flex items-center justify-between',
        nav: 'flex gap-1',
        nav_button_previous: 'text-foreground flex items-center justify-center !bg-transparent',
        nav_button_next: 'text-foreground flex items-center justify-center !bg-transparent',
        head_cell: 'uppercase text-xs text-foreground font-medium pt-1 pb-2',
        button: 'text-muted-foreground cursor-pointer w-10 h-10 hover:bg-accent rounded-full',
        day_today: 'bg-accent font-bold text-foreground',
        day_selected: '!bg-primary text-primary-foreground font-medium',
      }}
      formatters={{
        formatCaption: (date, options) => capitalizeFirstLetter(format(date, 'LLLL yyyy', options)),
      }}
    />
  );
}
