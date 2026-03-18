import { Card, CardContent, CardHeader, CardTitle } from '@/views/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/views/components/ui/form';
import { InputCurrency } from '@/views/components/InputCurrency';
import { Button } from '@/views/components/ui/button';
import { Select } from '@/views/components/Select';
import { DatePickerInput } from '@/views/components/DatePickerInput';
import { Input } from '@/views/components/ui/input';
import type { UseFormReturn } from 'react-hook-form';
import type { SimulateFormInput } from '../../schemas/simulate-schema';

interface SimulateFormProps {
  form: UseFormReturn<SimulateFormInput>;
  onSubmit: () => void;
  isPending: boolean;
  accountsOptions: { value: string; label: string }[];
  categoriesOptions: { value: string; label: string }[];
}

export function SimulateForm({
  form,
  onSubmit,
  isPending,
  accountsOptions,
  categoriesOptions,
}: SimulateFormProps) {
  const type = form.watch('type');
  const isExpense = type === 'EXPENSE';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parâmetros da simulação</CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure os dados do evento financeiro para visualizar o impacto na sua projeção.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <Select
                        placeholder="Selecione o tipo"
                        value={field.value}
                        onChange={field.onChange}
                        options={[
                          { value: 'INCOME', label: 'Receita' },
                          { value: 'EXPENSE', label: 'Despesa' },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período da projeção (meses)</FormLabel>
                    <FormControl>
                      <Select
                        placeholder="Período"
                        value={String(field.value)}
                        onChange={(val) => field.onChange(val)}
                        options={[
                          { value: '12', label: '12 meses' },
                          { value: '24', label: '24 meses' },
                          { value: '60', label: '60 meses' },
                        ]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isExpense ? 'Valor da parcela' : 'Valor mensal recorrente'}
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">R$</span>
                      <InputCurrency
                        error={form.formState.errors.value?.message}
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        className="text-2xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de início</FormLabel>
                  <FormControl>
                    <DatePickerInput
                      value={field.value}
                      onChange={field.onChange}
                      error={form.formState.errors.date?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="bankAccountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conta (opcional)</FormLabel>
                    <FormControl>
                      <Select
                        placeholder="Selecione a conta"
                        value={field.value || ''}
                        onChange={field.onChange}
                        options={accountsOptions}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria (opcional)</FormLabel>
                    <FormControl>
                      <Select
                        placeholder="Selecione a categoria"
                        value={field.value || ''}
                        onChange={field.onChange}
                        options={categoriesOptions}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {isExpense && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="parcels"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parcelas (opcional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="Ex: 12"
                          value={field.value ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val === '' ? undefined : Number(val));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="entrada"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entrada - R$ (opcional)</FormLabel>
                      <FormControl>
                        <InputCurrency
                          value={field.value ?? ''}
                          onChange={(val) => field.onChange(val || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="juros"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Juros % a.m. (opcional)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          step={0.1}
                          placeholder="Ex: 1.5"
                          value={field.value ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val === '' ? undefined : Number(val));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <Button type="submit" className="w-full" isLoading={isPending}>
              Simular
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
