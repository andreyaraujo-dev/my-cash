import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { goalOperationSchema, GoalOperationSchema } from '../../schemas/goal-operation-schema';
import { useToast } from '@/app/hooks/useToast';
import { useEffect, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { goalsService } from '@/app/services/goalsService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';
import { Goal } from '@/app/entities/Goal';

interface UseGoalOperationModalControllerProps {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal | null;
}

export function useGoalOperationModalController({
  isOpen,
  onClose,
  goal,
}: UseGoalOperationModalControllerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();

  const form = useForm<GoalOperationSchema>({
    resolver: zodResolver(goalOperationSchema),
    defaultValues: {
      type: 'DEPOSIT',
      value: 0,
      bankAccountId: '',
      description: '',
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: goalsService.createOperation,
  });

  const operationType = form.watch('type');

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!goal) return;

    // Validação: não pode retirar mais do que tem disponível
    if (data.type === 'WITHDRAW') {
      const value =
        typeof data.value === 'string' ? currencyStringToNumber(data.value) : data.value;
      if (value > goal.currentValue) {
        toast({
          title: 'Erro!',
          description: 'Não é possível retirar mais do que o valor disponível na meta.',
          duration: 3000,
        });
        return;
      }
    }

    try {
      await mutateAsync({
        goalId: goal.id,
        ...data,
        value: typeof data.value === 'string' ? currencyStringToNumber(data.value) : data.value,
      });

      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['goal-operations', goal.id] });
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] });

      toast({
        title: 'Sucesso!',
        description:
          data.type === 'DEPOSIT'
            ? 'Valor depositado na meta com sucesso!'
            : 'Valor retirado da meta com sucesso!',
        duration: 3000,
      });

      onClose();
      form.reset();
    } catch {
      toast({
        title: 'Erro!',
        description: 'Erro ao processar operação. Tente novamente.',
        duration: 3000,
      });
    }
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        type: 'DEPOSIT',
        value: 0,
        bankAccountId: '',
        description: '',
      });
    }
  }, [isOpen, form]);

  const accountOptions = useMemo(
    () =>
      accounts.map((account) => ({
        value: account.id,
        label: account.name,
      })),
    [accounts],
  );

  const typeOptions = useMemo(
    () => [
      { value: 'DEPOSIT', label: 'Depositar (Guardar)' },
      { value: 'WITHDRAW', label: 'Retirar' },
    ],
    [],
  );

  return {
    form,
    handleSubmit,
    isLoading: isPending,
    accountOptions,
    typeOptions,
    operationType,
  };
}
