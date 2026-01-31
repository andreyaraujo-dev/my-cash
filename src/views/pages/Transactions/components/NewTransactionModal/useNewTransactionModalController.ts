import { useTransactionsContext } from '@/app/hooks/useTransactionsContext';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/app/hooks/useToast.ts';
import { useEffect, useMemo } from 'react';
import { useBankAccounts } from '@/app/hooks/useBankAccounts.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCategories } from '@/app/hooks/useCategories.ts';
import { transactionsService } from '@/app/services/transactionsService';
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

export function useNewTransactionModalController() {
  const { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType } =
    useTransactionsContext();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: '0',
      date: new Date(),
    },
  });

  const { handleSubmit: hookFormSubmit } = form;

  const { accounts } = useBankAccounts();
  const queryClient = useQueryClient();
  const { categories: categoriesList } = useCategories();
  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['createCategories'],
    mutationFn: transactionsService.create,
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['transactions'], exact: false });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });

      toast({
        title: 'Sucesso!',
        description:
          newTransactionType === 'EXPENSE'
            ? 'Despesa cadastrada com sucesso!'
            : 'Receita cadastrada com sucesso!',
        duration: 3000,
      });
      closeNewTransactionModal();
      form.reset();
    } catch {
      toast({
        title: 'Erro!',
        description:
          newTransactionType === 'EXPENSE'
            ? 'Erro ao cadastrar despesa!'
            : 'Erro ao cadastrar receita!',
        duration: 3000,
      });
    }
  });

  useEffect(() => {
    form.reset();
  }, [isNewTransactionModalOpen]);

  const categories = useMemo(
    () => categoriesList.filter((category) => category.type === newTransactionType),
    [categoriesList, newTransactionType],
  );

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    form,
    handleSubmit,
    categories,
    isLoading: isPending,
    accounts,
  };
}
