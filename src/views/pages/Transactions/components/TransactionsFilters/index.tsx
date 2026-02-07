/* eslint-disable no-unused-vars */
import { Select } from '@/views/components/Select';
import { Button } from '@/views/components/ui/button';
import { Card } from '@/views/components/ui/card';
import { Input } from '@/views/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Filter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  filterTransactionsSchema,
  FilterTransactionsSchema,
} from '../../schemas/filter-transactions-schemas';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/views/components/ui/form';
import { TransactionsFilters as Filters } from '@/app/services/transactionsService/getAll';
import { Transaction } from '@/app/entities/Transaction';

interface TransactionsFiltersProps {
  filters: Filters;
  handleChangeFilters: <TFilter extends keyof Filters>(
    filter: TFilter,
  ) => (value: Filters[TFilter]) => void;
  handleApplyFilters: (filters: {
    bankAccountId?: string | undefined;
    year: number;
    isPaid: boolean | undefined;
    month?: number;
    type?: Transaction['type'];
    title?: string;
  }) => void;
}

export function TransactionsFilters({
  filters,
  handleApplyFilters,
  handleChangeFilters,
}: TransactionsFiltersProps) {
  const form = useForm<FilterTransactionsSchema>({
    resolver: zodResolver(filterTransactionsSchema),
    defaultValues: {
      month: filters.month,
      year: filters.year,
      isPaid: filters.isPaid ? 'paid' : filters.isPaid === undefined ? 'all' : 'pending',
      name: '',
      type: filters.type,
    },
  });

  async function handleSubmit(data: FilterTransactionsSchema) {
    handleApplyFilters({
      isPaid: data.isPaid === 'paid' ? true : data.isPaid === 'all' ? undefined : false,
      year: data.year as number,
      month: data.month as number,
      type: data.type,
      title: data.name,
    });
  }

  return (
    <Card className="p-4 w-full">
      <div className="flex items-center gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col md:flex-row gap-2 items-end justify-between w-full flex-wrap"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="search"
                      placeholder="Buscar transações..."
                      className="w-full"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="month"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mês</FormLabel>

                  <FormControl>
                    <Select
                      {...field}
                      value={field.value?.toString()}
                      onChange={(value: string) => {
                        const monthValue = parseInt(value, 10);
                        field.onChange(monthValue);
                        handleChangeFilters('month')(monthValue);
                      }}
                      options={[
                        { value: '1', label: 'Janeiro' },
                        { value: '2', label: 'Fevereiro' },
                        { value: '3', label: 'Março' },
                        { value: '4', label: 'Abril' },
                        { value: '5', label: 'Maio' },
                        { value: '6', label: 'Junho' },
                        { value: '7', label: 'Julho' },
                        { value: '8', label: 'Agosto' },
                        { value: '9', label: 'Setembro' },
                        { value: '10', label: 'Outubro' },
                        { value: '11', label: 'Novembro' },
                        { value: '12', label: 'Dezembro' },
                      ]}
                      className="w-max min-w-32"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>

                  <FormControl>
                    <Select
                      {...field}
                      value={field.value?.toString()}
                      onChange={(value: string) => {
                        const yearValue = parseInt(value, 10);
                        field.onChange(yearValue);
                        handleChangeFilters('year')(yearValue);
                      }}
                      options={(() => {
                        const currentYear = new Date().getFullYear();
                        const years = [];
                        for (let year = currentYear; year >= currentYear - 9; year--) {
                          years.push({
                            value: year.toString(),
                            label: year.toString(),
                          });
                        }
                        return years;
                      })()}
                      className="w-max min-w-24"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>

                  <FormControl>
                    <Select
                      {...field}
                      value={field.value || 'ALL'}
                      onChange={(value: 'INCOME' | 'EXPENSE') => {
                        handleChangeFilters('type')(value);
                        field.onChange(value);
                      }}
                      options={[
                        { label: 'Todos', value: 'ALL' },
                        { label: 'Receitas', value: 'INCOME' },
                        { label: 'Despesas', value: 'EXPENSE' },
                      ]}
                      className="w-28"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPaid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>

                  <FormControl>
                    <Select
                      {...field}
                      value={field.value || ''}
                      onChange={(value: 'paid' | 'pending' | 'all') => {
                        handleChangeFilters('isPaid')(
                          value === 'paid' ? true : value === 'pending' ? false : undefined,
                        );
                        field.onChange(value);
                      }}
                      className="w-28"
                      options={[
                        { label: 'Todos', value: 'all' },
                        { label: 'Pagos', value: 'paid' },
                        { label: 'Pendentes', value: 'pending' },
                      ]}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" variant="outline" className="h-12 w-max">
              <Filter size={16} />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
