import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDashboard } from '@/app/hooks/useDashboard.ts';
import { bankAccountsService } from '@/app/services/bankAccountService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber.ts';
import { useToast } from '@/app/hooks/useToast.ts';

const schema = z.object({
  initialBalance: z.union([z.string().nonempty('Saldo inicial é obrigatório'), z.number()]),
  name: z.string().nonempty('Nome é obrigatório'),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH', 'SAVING']),
  color: z.string().nonempty('Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const { toast } = useToast();
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } = useDashboard();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { handleSubmit: hookFormSubmit } = form;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (isEditAccountModalOpen && accountBeingEdited) {
      form.reset({
        color: accountBeingEdited.color,
        name: accountBeingEdited.name,
        type: accountBeingEdited.type,
        initialBalance: accountBeingEdited.initialBalance,
      });
    } else {
      form.reset({});
    }
  }, [isEditAccountModalOpen, accountBeingEdited]);

  const queryClient = useQueryClient();
  const { isPending, mutateAsync: updateAccount } = useMutation({
    mutationKey: ['updateAccount'],
    mutationFn: bankAccountsService.update,
  });
  const { isPending: isLoadingDelete, mutateAsync: removeAccount } = useMutation({
    mutationKey: ['removeAccount'],
    mutationFn: bankAccountsService.remove,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast({ title: 'Sucesso!', description: 'Conta editada com sucesso!', duration: 3000 });
      closeEditAccountModal();
    } catch {
      toast({ title: 'Erro!', description: 'Erro ao salvar as alterações!', duration: 3000 });
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
      toast({ title: 'Sucesso', description: 'Conta deletada com sucesso!', duration: 3000 });
      handleCloseDeleteModal();
      closeEditAccountModal();
    } catch {
      toast({ title: 'Erro!', description: 'Erro ao deletar conta!', duration: 3000 });
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    form,
    handleSubmit,
    isLoading: isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete,
  };
}
