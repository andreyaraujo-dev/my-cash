import { Modal } from '@/views/components/Modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/views/components/ui/form.tsx';
import { Index } from '@/views/components/InputCurrency';
import { Input } from '@/views/components/ui/input.tsx';
import { Select } from '@/views/components/Select';
import { DatePickerInput } from '@/views/components/DatePickerInput';
import { Button } from '@/views/components/ui/button.tsx';
import { ConfirmDeleteModal } from '@/views/components/ConfirmDeleteModal';
import { useEditTransactionModalController } from '@/views/pages/Dashboard/components/Modals/EditTransactionModal/useEditTransactionModalController.ts';
import { TrashIcon } from 'lucide-react';
import { Transaction } from '@/app/entities/Transaction.ts';
import { Checkbox } from '@/views/components/ui/checkbox';

interface EditTransactionModalProps {
  open: boolean;
  onClose(): void;
  transaction: Transaction | null;
}

export function EditTransactionModal({ transaction, open, onClose }: EditTransactionModalProps) {
  const {
    handleSubmit,
    form,
    accounts,
    categories,
    isLoading,
    isLoadingDelete,
    isDeleteModalOpen,
    handleDeleteTransaction,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen)
    return (
      <ConfirmDeleteModal
        title={`Tem certeza que deseja excluir esta ${isExpense ? 'despesa' : 'receita'}?`}
        isLoading={isLoadingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteTransaction}
      />
    );

  return (
    <Modal
      open={open}
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      onClose={onClose}
      rightAction={
        <button
          type="button"
          onClick={handleOpenDeleteModal}
          className="rounded-full hover:bg-zinc-900 w-max h-max flex items-center justify-center p-2 transition-colors"
        >
          <TrashIcon className="w-6 h-6 text-red-900" />
        </button>
      }
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
                      <Index
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
                      error={form.formState.errors.name?.message}
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

            <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
