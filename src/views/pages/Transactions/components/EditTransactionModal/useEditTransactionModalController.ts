import { z } from 'zod';
import { Transaction } from '@/app/entities/Transaction.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBankAccounts } from '@/app/hooks/useBankAccounts.ts';
import { useCategories } from '@/app/hooks/useCategories.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { transactionsService } from '@/app/services/transactionsService';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useToast } from '@/app/hooks/useToast.ts';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber.ts';

const schema = z.object({
  value: z.union([z.string().nonempty('Informe o valor'), z.number()]).transform((val, ctx) => {
    if (val === 0 || val === '0' || val === '0,00') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A transação precisa ter um valor',
      });
      return z.NEVER;
    }

    return val;
  }),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a conta'),
  date: z.date(),
  isPaid: z.boolean().optional().default(false),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: transaction?.name,
      value: transaction?.value,
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      date: transaction ? new Date(transaction.date) : new Date(),
      isPaid: transaction?.isPaid,
    },
  });

  const { handleSubmit: hookFormSubmit } = form;

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const { isPending, mutateAsync: updateTransaction } = useMutation({
    mutationKey: ['updateTransaction'],
    mutationFn: transactionsService.update,
  });
  const { isPending: isLoadingDelete, mutateAsync: removeTransaction } = useMutation({
    mutationKey: ['deleteTransaction'],
    mutationFn: transactionsService.remove,
  });
  const { isPending: isLoadingRecurringUpdate, mutateAsync: updateRecurringTransaction } =
    useMutation({
      mutationKey: ['updateRecurringTransaction'],
      mutationFn: transactionsService.updateRecurring,
    });
  const { isPending: isLoadingRecurringDelete, mutateAsync: removeRecurringTransaction } =
    useMutation({
      mutationKey: ['deleteRecurringTransaction'],
      mutationFn: ({
        transactionId,
        scope,
      }: {
        transactionId: string;
        scope: 'single' | 'future';
      }) => transactionsService.removeRecurring(transactionId, scope),
    });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [scopeDialogOpen, setScopeDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'edit' | 'delete' | null>(null);
  const pendingFormData = useRef<FormData | null>(null);

  const isRecurring = !!transaction?.recurrenceGroupId;

  const invalidateQueries = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['transactions'] });
    queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });
  }, [queryClient]);

  // --- Delete logic ---

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);
      invalidateQueries();
      toast({ title: 'Sucesso!', description: 'Transação deletada com sucesso!', duration: 3000 });
      onClose();
    } catch {
      toast({ title: 'Erro!', description: 'Erro ao deletar transação!', duration: 3000 });
    }
  }

  function handleOpenDeleteModal() {
    if (isRecurring) {
      setPendingAction('delete');
      setScopeDialogOpen(true);
    } else {
      setIsDeleteModalOpen(true);
    }
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  // --- Edit logic ---

  const handleSubmit = hookFormSubmit(async (data) => {
    if (isRecurring) {
      pendingFormData.current = data;
      setPendingAction('edit');
      setScopeDialogOpen(true);
      return;
    }

    try {
      await updateTransaction({
        ...data,
        id: transaction!.id,
        type: transaction!.type,
        value: currencyStringToNumber(data.value),
        date: data.date.toISOString(),
      });

      invalidateQueries();

      toast({
        title: 'Sucesso!',
        description:
          transaction!.type === 'EXPENSE'
            ? 'Despesa editada com sucesso!'
            : 'Receita editada com sucesso!',
        duration: 3000,
      });
      onClose();
    } catch {
      toast({
        title: 'Erro!',
        description:
          transaction!.type === 'EXPENSE' ? 'Erro ao editar despesa!' : 'Erro ao editar receita!',
        duration: 3000,
      });
    }
  });

  // --- Scope dialog logic ---

  function handleCloseScopeDialog() {
    setScopeDialogOpen(false);
    setPendingAction(null);
    pendingFormData.current = null;
  }

  async function handleScopeSelect(scope: 'single' | 'future') {
    try {
      if (pendingAction === 'edit' && pendingFormData.current) {
        const data = pendingFormData.current;
        await updateRecurringTransaction({
          id: transaction!.id,
          scope,
          name: data.name,
          bankAccountId: data.bankAccountId,
          categoryId: data.categoryId,
          value: currencyStringToNumber(data.value),
          type: transaction!.type,
          date: data.date.toISOString(),
          isPaid: data.isPaid,
        });

        invalidateQueries();
        toast({
          title: 'Sucesso!',
          description:
            scope === 'single'
              ? 'Transação editada com sucesso!'
              : 'Transações recorrentes editadas com sucesso!',
          duration: 3000,
        });
      } else if (pendingAction === 'delete') {
        await removeRecurringTransaction({
          transactionId: transaction!.id,
          scope,
        });

        invalidateQueries();
        toast({
          title: 'Sucesso!',
          description:
            scope === 'single'
              ? 'Transação deletada com sucesso!'
              : 'Transações recorrentes deletadas com sucesso!',
          duration: 3000,
        });
      }

      handleCloseScopeDialog();
      onClose();
    } catch {
      toast({
        title: 'Erro!',
        description:
          pendingAction === 'edit'
            ? 'Erro ao editar transação recorrente!'
            : 'Erro ao deletar transação recorrente!',
        duration: 3000,
      });
    }
  }

  const categories = useMemo(
    () => categoriesList.filter((category) => category.type === transaction?.type),
    [categoriesList, transaction],
  );

  return {
    form,
    handleSubmit,
    accounts,
    categories,
    isLoading: isPending,
    isDeleteModalOpen,
    isLoadingDelete,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    isRecurring,
    scopeDialogOpen,
    pendingAction,
    handleCloseScopeDialog,
    handleScopeSelect,
    isLoadingScopeAction: isLoadingRecurringUpdate || isLoadingRecurringDelete,
  };
}
