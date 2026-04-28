import { useDashboard } from '@/app/hooks/useDashboard.ts';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/app/hooks/useToast.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bankAccountsService } from '@/app/services/bankAccountService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber.ts';
import { useEffect } from 'react';

const schema = z.object({
  initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
  name: z.string().nonempty('Nome é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH'], { message: 'Tipo de conta é obrigatório' }),
  color: z.string().nonempty('Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: '0',
    },
  });

  const { handleSubmit: hookFormSubmit } = form;

  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['createBankAccount'],
    mutationFn: bankAccountsService.create,
  });

  useEffect(() => {
    form.reset();
  }, [isNewAccountModalOpen]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });

      toast({ title: 'Sucesso!', description: 'Conta cadastrada com sucesso!', duration: 3000 });
      closeNewAccountModal();
      form.reset();
    } catch {
      toast({ title: 'Erro!', description: 'Erro ao cadastrar a conta!' });
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    handleSubmit,
    form,
    isLoading: isPending,
  };
}
