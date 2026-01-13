import { useCategoriesWithTransactions } from '@/app/hooks/useCategories';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesService } from '@/app/services/categoriesService';
import { useToast } from '@/app/hooks/useToast';
import { createCategorySchema, CreateCategorySchema } from '../schemas/create-category-schema';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';
import { Category } from '@/app/entities/Category';

export function useCategoriesController() {
  const { categoriesWithTransactions, isFetching: isLoadingCategoriesWithTransactions } =
    useCategoriesWithTransactions();
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategoryForEdit, setSelectedCategoryForEdit] = useState<Category | null>(null);
  const [selectedCategoryForDelete, setSelectedCategoryForDelete] = useState<Category | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      type: 'EXPENSE',
      icon: '',
      budget: '',
    },
  });

  const { handleSubmit: hookFormSubmit } = form;

  const editForm = useForm<CreateCategorySchema>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: '',
      type: 'EXPENSE',
      icon: '',
      budget: '',
    },
  });

  const { handleSubmit: hookFormSubmitEdit } = editForm;

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['createCategory'],
    mutationFn: categoriesService.create,
  });

  const { isPending: isPendingUpdate, mutateAsync: updateCategory } = useMutation({
    mutationKey: ['updateCategory'],
    mutationFn: categoriesService.update,
  });

  const { isPending: isPendingDelete, mutateAsync: deleteCategory } = useMutation({
    mutationKey: ['deleteCategory'],
    mutationFn: categoriesService.remove,
  });

  useEffect(() => {
    if (!isNewCategoryModalOpen) {
      form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewCategoryModalOpen]);

  useEffect(() => {
    if (!isEditCategoryModalOpen) {
      editForm.reset();
      setSelectedCategoryForEdit(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditCategoryModalOpen]);

  useEffect(() => {
    if (!isDeleteModalOpen) {
      setSelectedCategoryForDelete(null);
    }
  }, [isDeleteModalOpen]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        name: data.name,
        icon: data.icon,
        type: data.type,
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

  const openEditCategoryModal = (category: Category) => {
    setSelectedCategoryForEdit(category);
    // Formatar budget para string no formato brasileiro (ex: 1000.50 -> "1000,50")
    const budgetString = category.budget ? category.budget.toFixed(2).replace('.', ',') : '';

    editForm.reset({
      name: category.name,
      type: category.type,
      icon: category.icon,
      budget: budgetString,
    });
    setIsEditCategoryModalOpen(true);
  };

  const closeEditCategoryModal = () => {
    setIsEditCategoryModalOpen(false);
  };

  const openDeleteModal = (category: Category) => {
    setSelectedCategoryForDelete(category);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleUpdateSubmit = hookFormSubmitEdit(async (data) => {
    if (!selectedCategoryForEdit) return;

    try {
      await updateCategory({
        id: selectedCategoryForEdit.id,
        name: data.name,
        icon: data.icon,
        type: data.type,
        budget: data.budget ? currencyStringToNumber(data.budget) : undefined,
      });

      queryClient.invalidateQueries({ queryKey: ['categoriesWithTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast({
        title: 'Sucesso!',
        description: 'Categoria editada com sucesso!',
        duration: 3000,
      });
      closeEditCategoryModal();
      editForm.reset();
    } catch {
      toast({
        title: 'Erro!',
        description: 'Erro ao editar a categoria!',
      });
    }
  });

  const handleDeleteConfirm = async () => {
    if (!selectedCategoryForDelete) return;

    try {
      await deleteCategory(selectedCategoryForDelete.id);

      queryClient.invalidateQueries({ queryKey: ['categoriesWithTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });

      toast({
        title: 'Sucesso!',
        description: 'Categoria deletada com sucesso!',
        duration: 3000,
      });
      closeDeleteModal();
    } catch {
      toast({
        title: 'Erro!',
        description: 'Erro ao deletar a categoria!',
      });
    }
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
    isEditCategoryModalOpen,
    selectedCategoryForEdit,
    openEditCategoryModal,
    closeEditCategoryModal,
    editForm,
    handleUpdateSubmit,
    isLoadingUpdateCategory: isPendingUpdate,
    isDeleteModalOpen,
    selectedCategoryForDelete,
    openDeleteModal,
    closeDeleteModal,
    handleDeleteConfirm,
    isLoadingDeleteCategory: isPendingDelete,
  };
}
