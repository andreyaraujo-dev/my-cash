import { Select } from '@/views/components/Select';
import { cn } from '@/lib/utils';

interface MonthYearPickerProps {
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onMonthChange?: (month: number) => void;
  // eslint-disable-next-line no-unused-vars
  onYearChange?: (year: number) => void;
  selectedMonth?: string;
  selectedYear?: string;
}

const months = [
  { value: '0', label: 'Janeiro' },
  { value: '1', label: 'Fevereiro' },
  { value: '2', label: 'Março' },
  { value: '3', label: 'Abril' },
  { value: '4', label: 'Maio' },
  { value: '5', label: 'Junho' },
  { value: '6', label: 'Julho' },
  { value: '7', label: 'Agosto' },
  { value: '8', label: 'Setembro' },
  { value: '9', label: 'Outubro' },
  { value: '10', label: 'Novembro' },
  { value: '11', label: 'Dezembro' },
];

// Gera uma lista dos últimos 10 anos até o ano atual
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = currentYear; year >= currentYear - 9; year--) {
    years.push({
      value: year.toString(),
      label: year.toString(),
    });
  }

  return years;
};

export function MonthYearPicker({
  className,
  onMonthChange,
  onYearChange,
  selectedMonth,
  selectedYear,
}: MonthYearPickerProps) {
  const years = generateYears();

  const handleMonthChange = (value: string) => {
    onMonthChange?.(parseInt(value, 10));
  };

  const handleYearChange = (value: string) => {
    onYearChange?.(parseInt(value, 10));
  };

  return (
    <div className={cn('flex gap-2', className)}>
      <Select
        options={months}
        // placeholder="Mês"
        value={selectedMonth}
        onChange={handleMonthChange}
        className="w-max min-w-32"
      />

      <Select
        options={years}
        // placeholder="Ano"
        value={selectedYear}
        onChange={handleYearChange}
        className="w-max min-w-24"
      />
    </div>
  );
}
