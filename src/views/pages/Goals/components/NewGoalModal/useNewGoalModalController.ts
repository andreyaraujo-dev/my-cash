import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createGoalSchema, CreateGoalSchema } from '../../schemas/create-goal-schema';
import { useToast } from '@/app/hooks/useToast';
import { useEffect, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCategories } from '@/app/hooks/useCategories';
import { goalsService } from '@/app/services/goalsService';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';

interface UseNewGoalModalControllerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function useNewGoalModalController({ isOpen, onClose }: UseNewGoalModalControllerProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { categories } = useCategories();

  const form = useForm<CreateGoalSchema>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      name: '',
      value: 0,
      dueDate: undefined,
      status: 'PENDING',
      importance: 'MEDIUM',
      priority: 'MEDIUM',
      description: '',
    },
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: goalsService.create,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        value: typeof data.value === 'string' ? currencyStringToNumber(data.value) : data.value,
        dueDate: data.dueDate.toISOString(),
      });

      queryClient.invalidateQueries({ queryKey: ['goals'] });

      toast({
        title: 'Sucesso!',
        description: 'Meta criada com sucesso!',
        duration: 3000,
      });

      onClose();
      form.reset();
    } catch {
      toast({
        title: 'Erro!',
        description: 'Erro ao criar meta. Tente novamente.',
        duration: 3000,
      });
    }
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        name: '',
        value: 0,
        dueDate: undefined,
        status: 'PENDING',
        importance: 'MEDIUM',
        priority: 'MEDIUM',
        description: '',
      });
    }
  }, [isOpen, form]);

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
      })),
    [categories],
  );

  return {
    form,
    handleSubmit,
    isLoading: isPending,
    statusOptions,
    importanceOptions,
    priorityOptions,
    categoryOptions,
  };
}
