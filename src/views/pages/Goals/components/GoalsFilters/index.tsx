import { Select } from '@/views/components/Select';
import { Button } from '@/views/components/ui/button';
import { Badge } from '@/views/components/ui/badge';
import { Card } from '@/views/components/ui/card';
import { Input } from '@/views/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/views/components/ui/accordion';
import { zodResolver } from '@hookform/resolvers/zod';
import { Filter, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { filterGoalsSchema, FilterGoalsSchema } from '../../schemas/filter-goals-schema';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/views/components/ui/form';
import { GoalsFilters as Filters } from '@/app/services/goalsService/getAll';
import { useCategories } from '@/app/hooks/useCategories';
import { useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@/views/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

interface GoalsFiltersProps {
  filters: Filters;
  // eslint-disable-next-line no-unused-vars
  handleChangeFilters: (filters: Filters) => void;
  handleClearFilters: () => void;
  isLoading?: boolean;
}

export function GoalsFilters({
  filters,
  handleChangeFilters,
  handleClearFilters,
  isLoading,
}: GoalsFiltersProps) {
  const [accordionValue, setAccordionValue] = useState<string>('');
  const { categories } = useCategories();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!accordionValue && !isMobile) {
      setAccordionValue('goals-filters');
    }
  }, [isMobile, accordionValue]);

  const form = useForm<FilterGoalsSchema>({
    resolver: zodResolver(filterGoalsSchema),
    defaultValues: {
      name: filters.name ?? '',
      status: filters.status,
      categoryId: filters.categoryId,
      importance: filters.importance,
      priority: filters.priority,
    },
  });

  const appliedFiltersCount = useMemo(() => {
    let count = 0;

    if (filters.name?.trim()) count += 1;
    if (filters.status) count += 1;
    if (filters.categoryId) count += 1;
    if (filters.importance) count += 1;
    if (filters.priority) count += 1;

    return count;
  }, [filters]);

  const statusOptions = useMemo(
    () => [
      { value: 'PENDING', label: 'Pendente' },
      { value: 'IN_PROGRESS', label: 'Em Progresso' },
      { value: 'COMPLETED', label: 'Concluída' },
      { value: 'CANCELLED', label: 'Cancelada' },
    ],
    [],
  );

  const importanceOptions = useMemo(
    () => [
      { value: 'LOW', label: 'Baixa' },
      { value: 'MEDIUM', label: 'Média' },
      { value: 'HIGH', label: 'Alta' },
    ],
    [],
  );

  const priorityOptions = useMemo(
    () => [
      { value: 'LOW', label: 'Baixa' },
      { value: 'MEDIUM', label: 'Média' },
      { value: 'HIGH', label: 'Alta' },
      { value: 'URGENT', label: 'Urgente' },
    ],
    [],
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categories],
  );

  async function handleSubmit(data: FilterGoalsSchema) {
    await Promise.resolve(
      handleChangeFilters({
        name: data.name?.trim() || undefined,
        status: data.status,
        categoryId: data.categoryId,
        importance: data.importance,
        priority: data.priority,
      }),
    );

    if (isMobile) {
      setAccordionValue('');
    }
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
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-12 w-[150px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-12 w-[150px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-12 w-[150px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-12 w-[150px]" />
          </div>
          <Skeleton className="h-12 w-24 shrink-0" />
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
        <AccordionItem value="goals-filters" className="border-b-0">
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
                    <FormItem className="flex-1">
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="search"
                          placeholder="Buscar metas..."
                          className="w-full min-w-44"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          value={field.value}
                          onChange={(value: string) => {
                            const statusValue = value as FilterGoalsSchema['status'];
                            field.onChange(statusValue);
                          }}
                          options={statusOptions}
                          placeholder="Todos"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          options={categoryOptions}
                          placeholder="Todas"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="importance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Importância</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          value={field.value}
                          onChange={(value: string) => {
                            const importanceValue = value as FilterGoalsSchema['importance'];
                            field.onChange(importanceValue);
                          }}
                          options={importanceOptions}
                          placeholder="Todas"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prioridade</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          value={field.value}
                          onChange={(value: string) => {
                            const priorityValue = value as FilterGoalsSchema['priority'];
                            field.onChange(priorityValue);
                          }}
                          options={priorityOptions}
                          placeholder="Todas"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset({
                        name: '',
                        status: undefined,
                        categoryId: undefined,
                        importance: undefined,
                        priority: undefined,
                      });
                      handleClearFilters();

                      if (isMobile) {
                        setAccordionValue('');
                      }
                    }}
                    className="w-full md:w-max h-12"
                  >
                    <X className="w-4 h-4" />
                    Limpar
                  </Button>

                  <Button
                    type="submit"
                    className="h-12 w-full md:w-max "
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
                </div>
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
