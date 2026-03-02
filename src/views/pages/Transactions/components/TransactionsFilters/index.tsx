/* eslint-disable no-unused-vars */
import { Select } from '@/views/components/Select';
import { Button } from '@/views/components/ui/button';
import { Card } from '@/views/components/ui/card';
import { Input } from '@/views/components/ui/input';
import { Badge } from '@/views/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/views/components/ui/accordion';
import { zodResolver } from '@hookform/resolvers/zod';
import { Filter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import {
  filterTransactionsSchema,
  FilterTransactionsSchema,
} from '../../schemas/filter-transactions-schemas';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/views/components/ui/form';
import { TransactionsFilters as Filters } from '@/app/services/transactionsService/getAll';
import { Transaction } from '@/app/entities/Transaction';
import { Skeleton } from '@/views/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

interface TransactionsFiltersProps {
  filters: Filters;
  handleApplyFilters: (filters: {
    bankAccountId?: string | undefined;
    year: number;
    isPaid: boolean | undefined;
    month?: number;
    type?: Transaction['type'];
    title?: string;
  }) => void;
  isLoading?: boolean;
}

export function TransactionsFilters({
  filters,
  handleApplyFilters,
  isLoading,
}: TransactionsFiltersProps) {
  const [accordionValue, setAccordionValue] = useState('');
  const form = useForm<FilterTransactionsSchema>({
    resolver: zodResolver(filterTransactionsSchema),
    defaultValues: {
      month: filters.month,
      year: filters.year,
      isPaid: filters.isPaid ? 'paid' : filters.isPaid === undefined ? 'all' : 'pending',
      name: filters.title ?? '',
      type: filters.type ?? 'ALL',
    },
  });

  const isMobile = useIsMobile();
  const appliedFiltersCount = useMemo(() => {
    const currentDate = new Date();
    const defaultMonth = currentDate.getMonth() + 1;
    const defaultYear = currentDate.getFullYear();

    let count = 0;

    if (filters.title?.trim()) count += 1;
    if (filters.type) count += 1;
    if (typeof filters.isPaid !== 'undefined') count += 1;
    if (filters.bankAccountId) count += 1;
    if (filters.month !== defaultMonth) count += 1;
    if (filters.year !== defaultYear) count += 1;

    return count;
  }, [filters]);

  async function handleSubmit(data: FilterTransactionsSchema) {
    await Promise.resolve(
      handleApplyFilters({
        isPaid: data.isPaid === 'paid' ? true : data.isPaid === 'all' ? undefined : false,
        year: data.year as number,
        month: data.month as number,
        type: data.type === 'ALL' ? undefined : data.type,
        title: data.name,
      }),
    );
    setAccordionValue('');
  }

  if (isLoading) {
    return (
      <Card className="p-4 w-full">
        <div className="flex flex-col md:flex-row gap-2 items-end w-full">
          <div className="flex-1 space-y-2 w-full">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-12 w-32" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-12 w-24" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-12 w-28" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-12 w-28" />
          </div>
          <Skeleton className="h-12 w-12 shrink-0" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 w-full">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={accordionValue}
        onValueChange={setAccordionValue}
      >
        <AccordionItem value="transactions-filters" className="border-b-0">
          <AccordionTrigger className="py-0 hover:no-underline">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filtros</span>
              {appliedFiltersCount > 0 && (
                <Badge className="h-4 min-w-4 rounded-full px-1 text-[8px] leading-none flex items-center justify-center">
                  {appliedFiltersCount}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col md:flex-row gap-2 items-end justify-between w-full"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="sm:flex-1 sm:min-w-40">
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
                          className="w-full min-w-32"
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
                          className="w-full min-w-24"
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
                          onChange={(value: 'INCOME' | 'EXPENSE' | 'ALL') => {
                            field.onChange(value);
                          }}
                          options={[
                            { label: 'Todos', value: 'ALL' },
                            { label: 'Receitas', value: 'INCOME' },
                            { label: 'Despesas', value: 'EXPENSE' },
                          ]}
                          className="w-full min-w-28"
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
                            field.onChange(value);
                          }}
                          className="w-full min-w-28"
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

                <Button
                  type="submit"
                  variant="outline"
                  className="h-12 w-max"
                  isLoading={form.formState.isSubmitting}
                >
                  {isMobile ? (
                    <>
                      <span className="text-sm font-medium">Aplicar Filtros</span>
                      <Filter size={16} />
                    </>
                  ) : (
                    <Filter size={16} />
                  )}
                </Button>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
