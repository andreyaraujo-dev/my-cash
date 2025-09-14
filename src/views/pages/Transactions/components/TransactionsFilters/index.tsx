import { MonthYearPicker } from '@/views/components/MonthYearPicker';
import { Select } from '@/views/components/Select';
import { Button } from '@/views/components/ui/button';
import { Card } from '@/views/components/ui/card';
import { Input } from '@/views/components/ui/input';
import { getMonth, getYear } from 'date-fns';
import { Filter } from 'lucide-react';

export function TransactionsFilters() {
  const now = new Date();

  return (
    <Card className="p-4 w-full">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input type="search" placeholder="Buscar transações..." className="w-full" />
        </div>

        <MonthYearPicker
          selectedMonth={getMonth(now).toString()}
          selectedYear={getYear(now).toString()}
        />

        <Select
          options={[
            { label: 'Todos', value: 'all' },
            { label: 'Receitas', value: 'income' },
            { label: 'Despesas', value: 'expense' },
          ]}
          placeholder="Tipo"
          className="w-28"
        />

        <Select
          className="w-28"
          options={[
            { label: 'Todos', value: 'all' },
            { label: 'Pagos', value: 'paid' },
            { label: 'Pendentes', value: 'pending' },
          ]}
          placeholder="Status"
        />

        <Button variant="outline" className="w-max">
          <Filter size={16} />
        </Button>
      </div>
    </Card>
  );
}
