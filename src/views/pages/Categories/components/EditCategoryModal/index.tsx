import { Modal } from '@/views/components/Modal';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/views/components/ui/form';
import { InputCurrency } from '@/views/components/InputCurrency';
import { IconDropdownInput } from '@/views/components/IconDropdownInput';
import { Button } from '@/views/components/ui/button';
import { Input } from '@/views/components/ui/input';
import { Select } from '@/views/components/Select';
import { useWatch, UseFormReturn } from 'react-hook-form';
import { useEffect } from 'react';
import { CreateCategorySchema } from '../../schemas/create-category-schema';
import { iconsMap } from '@/views/components/icons/Categories/iconsMap';
import { Category } from '@/app/entities/Category';

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: UseFormReturn<CreateCategorySchema>;
  handleSubmit: () => void;
  isLoading: boolean;
  category: Category | null;
}

export function EditCategoryModal({
  isOpen,
  onClose,
  form,
  handleSubmit,
  isLoading,
}: EditCategoryModalProps) {
  const selectedType = useWatch({ control: form.control, name: 'type' });
  const currentIcon = useWatch({ control: form.control, name: 'icon' });

  useEffect(() => {
    if (selectedType && currentIcon) {
      const availableIcons = Object.keys(iconsMap[selectedType]);
      if (!availableIcons.includes(currentIcon)) {
        form.setValue('icon', '');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType, currentIcon]);

  return (
    <Modal open={isOpen} title="Editar Categoria" onClose={onClose}>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
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
                      placeholder="Nome da Categoria"
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
                          label: 'Despesa',
                          value: 'EXPENSE',
                        },
                        {
                          label: 'Receita',
                          value: 'INCOME',
                        },
                      ]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedType && (
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <IconDropdownInput
                        error={form.formState.errors.icon?.message}
                        {...field}
                        onChange={field.onChange}
                        value={field.value}
                        type={selectedType}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <span className="text-gray-600 tracking-[-0.5px] text-xs">
                      Orçamento (opcional)
                    </span>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
                      <FormControl>
                        <InputCurrency
                          error={form.formState.errors.budget?.message}
                          {...field}
                          value={field.value || ''}
                          defaultValue="0"
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </div>
                  </div>
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
