import { useCategoriesWithTransactions } from '@/app/hooks/useCategories';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesService } from '@/app/services/categoriesService';
import { useToast } from '@/app/hooks/useToast';
import { createCategorySchema, CreateCategorySchema } from '../schemas/create-category-schema';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';

export function useCategoriesController() {
  const { categoriesWithTransactions, isFetching: isLoadingCategoriesWithTransactions } =
    useCategoriesWithTransactions();
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      type: 'EXPENSE',
      icon: '',
      color: '',
      budget: '',
    },
  });

  const { handleSubmit: hookFormSubmit } = form;

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['createCategory'],
    mutationFn: categoriesService.create,
  });

  useEffect(() => {
    if (!isNewCategoryModalOpen) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewCategoryModalOpen]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        name: data.name,
        icon: data.icon,
        type: data.type,
        color: data.color,
        budget: data.budget ? currencyStringToNumber(data.budget) : undefined,
      });

      queryClient.invalidateQueries({ queryKey: ['categoriesWithTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast({
        title: 'Sucesso!',
        description: 'Categoria criada com sucesso!',
        duration: 3000,
      });
      closeNewCategoryModal();
      form.reset();
    } catch {
      toast({
        title: 'Erro!',
        description: 'Erro ao criar a categoria!',
      });
    }
  });

  const openNewCategoryModal = () => {
    setIsNewCategoryModalOpen(true);
  };

  const closeNewCategoryModal = () => {
    setIsNewCategoryModalOpen(false);
  };

  return {
    categoriesWithTransactions,
    isLoadingCategoriesWithTransactions,
    isNewCategoryModalOpen,
    openNewCategoryModal,
    closeNewCategoryModal,
    form,
    handleSubmit,
    isLoadingCreateCategory: isPending,
  };
}
