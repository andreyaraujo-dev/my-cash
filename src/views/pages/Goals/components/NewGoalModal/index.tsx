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
import { Input } from '@/views/components/ui/input';
import { Select } from '@/views/components/Select';
import { useNewGoalModalController } from './useNewGoalModalController';
import { Textarea } from '@/views/components/ui/textarea';
import { DatePickerInput } from '@/views/components/DatePickerInput';

interface NewGoalModalProps {
  open: boolean;
  onClose: () => void;
}

export function NewGoalModal({ open, onClose }: NewGoalModalProps) {
  const {
    form,
    handleSubmit,
    isLoading,
    statusOptions,
    importanceOptions,
    priorityOptions,
    categoryOptions,
  } = useNewGoalModalController({ isOpen: open, onClose });

  return (
    <Modal open={open} title="Nova Meta" onClose={onClose}>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Meta</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Ex: Viagem para Europa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Alvo</FormLabel>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">R$</span>
                    <FormControl>
                      <InputCurrency
                        error={form.formState.errors.targetValue?.message}
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Atual</FormLabel>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">R$</span>
                    <FormControl>
                      <InputCurrency
                        error={form.formState.errors.currentValue?.message}
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Vencimento</FormLabel>
                  <FormControl>
                    <DatePickerInput
                      error={form.formState.errors.dueDate?.message}
                      value={field.value}
                      onChange={field.onChange}
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
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select
                      placeholder="Selecione uma categoria"
                      error={form.formState.errors.categoryId?.message}
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                      options={categoryOptions}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        placeholder="Selecione o status"
                        error={form.formState.errors.status?.message}
                        {...field}
                        onChange={field.onChange}
                        value={field.value}
                        options={statusOptions}
                      />
                    </FormControl>
                    <FormMessage />
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
                        placeholder="Selecione"
                        error={form.formState.errors.importance?.message}
                        {...field}
                        onChange={field.onChange}
                        value={field.value}
                        options={importanceOptions}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioridade</FormLabel>
                  <FormControl>
                    <Select
                      placeholder="Selecione a prioridade"
                      error={form.formState.errors.priority?.message}
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                      options={priorityOptions}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <Textarea placeholder="Descreva sua meta..." {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Criar Meta
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
