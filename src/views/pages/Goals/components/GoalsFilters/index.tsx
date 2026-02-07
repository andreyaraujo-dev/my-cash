import { Select } from '@/views/components/Select';
import { Button } from '@/views/components/ui/button';
import { Card } from '@/views/components/ui/card';
import { Input } from '@/views/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { filterGoalsSchema, FilterGoalsSchema } from '../../schemas/filter-goals-schema';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/views/components/ui/form';
import { GoalsFilters as Filters } from '@/app/services/goalsService/getAll';
import { useCategories } from '@/app/hooks/useCategories';
import { useMemo } from 'react';

interface GoalsFiltersProps {
  filters: Filters;
  handleChangeFilters: <TFilter extends keyof Filters>(
    filter: TFilter,
  ) => (value: Filters[TFilter]) => void;
  handleClearFilters: () => void;
}

export function GoalsFilters({
  filters,
  handleChangeFilters,
  handleClearFilters,
}: GoalsFiltersProps) {
  const { categories } = useCategories();

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

  return (
    <Card className="p-4 w-full">
      <div className="flex items-center gap-4">
        <Form {...form}>
          <form className="flex flex-col md:flex-row gap-2 items-end justify-between w-full flex-wrap">
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
                      className="w-full"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleChangeFilters('name')(e.target.value || undefined);
                      }}
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
                        handleChangeFilters('status')(statusValue);
                      }}
                      options={statusOptions}
                      placeholder="Todos"
                      className="w-full md:w-[150px]"
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
                      onChange={(value: string) => {
                        field.onChange(value);
                        handleChangeFilters('categoryId')(value || undefined);
                      }}
                      options={categoryOptions}
                      placeholder="Todas"
                      className="w-full md:w-[150px]"
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
                        handleChangeFilters('importance')(importanceValue);
                      }}
                      options={importanceOptions}
                      placeholder="Todas"
                      className="w-full md:w-[150px]"
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
                        handleChangeFilters('priority')(priorityValue);
                      }}
                      options={priorityOptions}
                      placeholder="Todas"
                      className="w-full md:w-[150px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

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
              }}
              className="w-max h-12"
            >
              <X className="w-4 h-4" />
              Limpar
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}
