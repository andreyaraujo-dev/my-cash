import { Goal } from '@/app/entities/Goal';
import { Modal } from '@/views/components/Modal';
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
import { useGoalOperationModalController } from './useGoalOperationModalController';
import { Textarea } from '@/views/components/ui/textarea';

interface GoalOperationModalProps {
  open: boolean;
  onClose: () => void;
  goal: Goal | null;
}

export function GoalOperationModal({ open, onClose, goal }: GoalOperationModalProps) {
  const { form, handleSubmit, isLoading, accountOptions, typeOptions, operationType } =
    useGoalOperationModalController({ isOpen: open, onClose, goal });

  if (!goal) return null;

  return (
    <Modal open={open} title="Operação de Valor" onClose={onClose}>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="bg-zinc-800 p-3 rounded-lg">
              <p className="text-sm text-zinc-400">Meta</p>
              <p className="font-semibold">{goal.name}</p>
              <p className="text-sm text-zinc-400 mt-1">
                Valor atual:{' '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(goal.currentValue)}
              </p>
            </div>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Operação</FormLabel>
                  <FormControl>
                    <Select
                      placeholder="Selecione o tipo"
                      error={form.formState.errors.type?.message}
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                      options={typeOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">R$</span>
                    <FormControl>
                      <InputCurrency
                        error={form.formState.errors.value?.message}
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                  {operationType === 'WITHDRAW' && (
                    <p className="text-xs text-zinc-400 mt-1">
                      Máximo disponível para retirada:{' '}
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(goal.currentValue)}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankAccountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conta Bancária</FormLabel>
                  <FormControl>
                    <Select
                      placeholder="Selecione a conta"
                      error={form.formState.errors.bankAccountId?.message}
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                      options={accountOptions}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-zinc-400 mt-1">
                    {operationType === 'DEPOSIT'
                      ? 'Conta de onde o dinheiro será retirado'
                      : 'Conta para onde o dinheiro será devolvido'}
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (opcional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Adicione uma observação..." {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Confirmar Operação
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
