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
        nav_button_previous: 'text-zinc-100 flex items-center justify-center !bg-transparent',
        nav_button_next: 'text-zinc-100 flex items-center justify-center !bg-transparent',
        head_cell: 'uppercase text-xs text-zinc-100 font-medium pt-1 pb-2',
        button: 'text-gray-700 cursor-pointer w-10 h-10 hover:bg-zinc-900 rounded-full',
        day_today: 'bg-zinc-900 font-bold text-zinc-100',
        day_selected: '!bg-zinc-700 text-white font-medium',
      }}
      formatters={{
        formatCaption: (date, options) => (
          <span className="text-zinc-100 pl-2 tracking-[-0.408px] font-medium">
            {capitalizeFirstLetter(format(date, 'LLLL yyyy', options))}
          </span>
        ),
      }}
    />
  );
}
