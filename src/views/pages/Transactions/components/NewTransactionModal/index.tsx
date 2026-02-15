import { Modal } from '@/views/components/Modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/views/components/ui/form.tsx';
import { InputCurrency } from '@/views/components/InputCurrency';
import { Button } from '@/views/components/ui/button.tsx';
import { Input } from '@/views/components/ui/input.tsx';
import { Select } from '@/views/components/Select';
import { useNewTransactionModalController } from './useNewTransactionModalController';
import { DatePickerInput } from '@/views/components/DatePickerInput';
import { Checkbox } from '@/views/components/ui/checkbox';
import { RecurrenceFrequency } from '@/app/entities/Transaction';

const recurrenceOptions = [
  { value: RecurrenceFrequency.DAILY, label: 'Diária' },
  { value: RecurrenceFrequency.WEEKLY, label: 'Semanal' },
  { value: RecurrenceFrequency.MONTHLY, label: 'Mensal' },
  { value: RecurrenceFrequency.YEARLY, label: 'Anual' },
];

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    form,
    handleSubmit,
    newTransactionType,
    accounts,
    categories,
    isLoading,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType === 'EXPENSE';
  const isRecurring = !!form.watch('recurrenceFrequency');

  return (
    <Modal
      open={isNewTransactionModalOpen}
      title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
      onClose={closeNewTransactionModal}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div>
            <span className="text-gray-600 tracking-[-0.5px] text-xs">
              Valor da {isExpense ? 'despesa' : 'receita'}
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputCurrency
                        error={form.formState.errors.value?.message}
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        className="mb-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
                      {...field}
                      // error={form.formState.errors.name?.message}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      placeholder="Categoria"
                      error={form.formState.errors.categoryId?.message}
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                      options={categories.map((category) => ({
                        value: category.id,
                        label: category.name,
                      }))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankAccountId"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                      error={form.formState.errors.bankAccountId?.message}
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                      options={accounts.map((account) => ({
                        value: account.id,
                        label: account.name,
                      }))}
                    />
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

            <FormField
              control={form.control}
              name="isPaid"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mr-2"
                    />
                  </FormControl>
                  <FormLabel className="text-zinc-100">
                    Já foi {isExpense ? 'Pago?' : 'Recebido?'}
                  </FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recurrenceFrequency"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={isRecurring}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange(RecurrenceFrequency.MONTHLY);
                          } else {
                            field.onChange(undefined);
                            form.setValue('recurrenceEndDate', undefined);
                          }
                        }}
                        className="mr-2"
                      />
                    </FormControl>
                    <FormLabel className="text-zinc-100">
                      Transação recorrente
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            {isRecurring && (
              <>
                <FormField
                  control={form.control}
                  name="recurrenceFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          placeholder="Frequência"
                          {...field}
                          onChange={field.onChange}
                          value={field.value}
                          options={recurrenceOptions}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recurrenceEndDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-400 text-xs">
                        Data final (opcional - padrão: 12 meses)
                      </FormLabel>
                      <FormControl>
                        <DatePickerInput
                          value={field.value}
                          onChange={field.onChange}
                          error={form.formState.errors.recurrenceEndDate?.message}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
              Criar
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
