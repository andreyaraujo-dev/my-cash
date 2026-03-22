import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createGoalSchema, CreateGoalSchema } from '../../schemas/create-goal-schema';
import { useToast } from '@/app/hooks/useToast';
import { useEffect, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCategories } from '@/app/hooks/useCategories';
import { goalsService } from '@/app/services/goalsService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';
import { Goal } from '@/app/entities/Goal';

interface UseEditGoalModalControllerProps {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal | null;
}

export function useEditGoalModalController({
  isOpen,
  onClose,
  goal,
}: UseEditGoalModalControllerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { categories } = useCategories();

  const form = useForm<CreateGoalSchema>({
    resolver: zodResolver(createGoalSchema),
  });

  const { isPending: isUpdating, mutateAsync: updateGoal } = useMutation({
    mutationFn: goalsService.update,
    mutationKey: ['updateGoal'],
  });

  const { isPending: isDeleting, mutateAsync: deleteGoal } = useMutation({
    mutationFn: goalsService.remove,
    mutationKey: ['deleteGoal'],
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!goal) return;

    try {
      await updateGoal({
        id: goal.id,
        ...data,
        targetValue:
          typeof data.targetValue === 'string'
            ? currencyStringToNumber(data.targetValue)
            : data.targetValue,
        currentValue:
          typeof data.currentValue === 'string'
            ? currencyStringToNumber(data.currentValue)
            : (data.currentValue ?? 0),
        dueDate: data.dueDate.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['goals'] });

      toast({
        title: 'Sucesso!',
        description: 'Meta atualizada com sucesso!',
        duration: 3000,
      });

      onClose();
    } catch {
      toast({
        title: 'Erro!',
        description: 'Erro ao atualizar meta. Tente novamente.',
        duration: 3000,
      });
    }
  });

  const handleDelete = async (deleteTransactions?: boolean) => {
    if (!goal) return;

    try {
      await deleteGoal({ goalId: goal.id, deleteTransactions });

      queryClient.invalidateQueries({ queryKey: ['goals'] });

      toast({
        title: 'Sucesso!',
        description: 'Meta deletada com sucesso!',
        duration: 3000,
      });

      onClose();
    } catch {
      toast({
        title: 'Erro!',
        description: 'Erro ao deletar meta. Tente novamente.',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    if (isOpen && goal) {
      form.reset({
        name: goal.name,
        targetValue: goal.targetValue,
        currentValue: goal.currentValue ?? 0,
        dueDate: new Date(goal.dueDate),
        status: goal.status,
        categoryId: goal.categoryId,
        importance: goal.importance,
        priority: goal.priority,
        description: goal.description || '',
      });
    }
  }, [isOpen, goal, form]);

  const statusOptions = useMemo(
    () => [
      { value: 'PENDING', label: 'Pendente' },
      { value: 'IN_PROGRESS', label: 'Em Progresso' },
      { value: 'COMPLETED', label: 'Concluída' },
      { value: 'CANCELLED', label: 'Cancelada' },
    ],
    [],
  );

  const importanceOptions = useMemo(
    () => [
      { value: 'LOW', label: 'Baixa' },
      { value: 'MEDIUM', label: 'Média' },
      { value: 'HIGH', label: 'Alta' },
    ],
    [],
  );

  const priorityOptions = useMemo(
    () => [
      { value: 'LOW', label: 'Baixa' },
      { value: 'MEDIUM', label: 'Média' },
      { value: 'HIGH', label: 'Alta' },
      { value: 'URGENT', label: 'Urgente' },
    ],
    [],
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
        icon: category.icon,
        type: category.type,
      })),
    [categories],
  );

  return {
    form,
    handleSubmit,
    handleDelete,
    isLoading: isUpdating,
    isDeleting,
    statusOptions,
    importanceOptions,
    priorityOptions,
    categoryOptions,
  };
}
