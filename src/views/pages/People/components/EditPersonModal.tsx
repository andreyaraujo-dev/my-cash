import { Modal } from '@/views/components/Modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/views/components/ui/form';
import { Button } from '@/views/components/ui/button';
import { Select } from '@/views/components/Select';
import type { UseFormReturn } from 'react-hook-form';
import type { UpdatePersonSchema } from '../schemas/personSchema';
import { SharedAccessLevel } from '@/app/entities/Person';
import type { Person } from '@/app/entities/Person';

const ACCESS_LEVEL_OPTIONS = [
  { value: SharedAccessLevel.READ_ONLY, label: 'Leitura' },
  { value: SharedAccessLevel.READ_WRITE, label: 'Leitura e escrita' },
  {
    value: SharedAccessLevel.READ_WRITE_RESTRICTED,
    label: 'Leitura e escrita (sem excluir)',
  },
];

interface EditPersonModalProps {
  open: boolean;
  onClose: () => void;
  form: UseFormReturn<UpdatePersonSchema>;
  onSubmit: () => void;
  isLoading: boolean;
  person: Person | null;
}

export function EditPersonModal({
  open,
  onClose,
  form,
  onSubmit,
  isLoading,
  person,
}: EditPersonModalProps) {
  return (
    <Modal open={open} title="Editar nível de acesso" onClose={onClose}>
      {person && (
        <div className="mb-4">
          <p className="font-medium">{person.name}</p>
          <p className="text-sm text-muted-foreground">{person.email}</p>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="mt-6 flex flex-col gap-4">
            <FormField
              control={form.control}
              name="accessLevel"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      placeholder="Nível de acesso"
                      error={form.formState.errors.accessLevel?.message}
                      {...field}
                      onChange={field.onChange}
                      value={field.value}
                      options={ACCESS_LEVEL_OPTIONS}
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
