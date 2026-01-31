import { ConfirmDeleteModal } from '@/views/components/ConfirmDeleteModal';
import { useEditAccountModalController } from '@/views/pages/Dashboard/components/Modals/EditAccountModal/useEditAccountModalController.ts';
import { Modal } from '@/views/components/Modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/views/components/ui/form.tsx';
import { InputCurrency } from '@/views/components/InputCurrency';
import { Input } from '@/views/components/ui/input.tsx';
import { Select } from '@/views/components/Select';
import { ColorsDropdownInput } from '@/views/components/ColorsDropdownInput';
import { Button } from '@/views/components/ui/button.tsx';
import { TrashIcon } from 'lucide-react';

export function EditAccountModal() {
  const {
    closeEditAccountModal,
    isEditAccountModalOpen,
    form,
    handleSubmit,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete,
  } = useEditAccountModalController();

  if (isDeleteModalOpen)
    return (
      <ConfirmDeleteModal
        title="Tem certeza que deseja excluir esta conta?"
        description="Ao excluir a conta, também serão excluídos todos os registros de
        receitas e despesas relacionados."
        isLoading={isLoadingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
      />
    );

  return (
    <Modal
      open={isEditAccountModalOpen}
      title="Editar Conta"
      onClose={closeEditAccountModal}
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
            <span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo inicial</span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
              <FormField
                control={form.control}
                name="initialBalance"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputCurrency
                        error={form.formState.errors.initialBalance?.message}
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
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
                      placeholder="Nome da Conta"
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      placeholder="Tipo"
                      error={form.formState.errors.type?.message}
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                      options={[
                        {
                          label: 'Conta Corrente',
                          value: 'CHECKING',
                        },
                        {
                          label: 'Investimentos',
                          value: 'INVESTMENT',
                        },
                        {
                          label: 'Dinheiro Físico',
                          value: 'CASH',
                        },
                      ]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ColorsDropdownInput
                      error={form.formState.errors.color?.message}
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
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
