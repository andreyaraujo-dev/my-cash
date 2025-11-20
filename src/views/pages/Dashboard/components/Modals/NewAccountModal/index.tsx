import { Modal } from '@/views/components/Modal';
import { useNewAccountModalController } from '@/views/pages/Dashboard/components/Modals/NewAccountModal/useNewAccountModalController.ts';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/views/components/ui/form.tsx';
import { Index } from '@/views/components/InputCurrency';
import { ColorsDropdownInput } from '@/views/components/ColorsDropdownInput';
import { Button } from '@/views/components/ui/button.tsx';
import { Input } from '@/views/components/ui/input.tsx';
import { Select } from '@/views/components/Select';

export function NewAccountModal() {
  const { closeNewAccountModal, isNewAccountModalOpen, form, handleSubmit, isLoading } =
    useNewAccountModalController();

  return (
    <Modal open={isNewAccountModalOpen} title="Nova Conta" onClose={closeNewAccountModal}>
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
                      <Index
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
              Criar
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
