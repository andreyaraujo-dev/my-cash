import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { peopleService } from '@/app/services/peopleService';
import { useToast } from '@/app/hooks/useToast';
import { getApiErrorMessage } from '@/app/utils/getApiErrorMessage';
import { createPersonSchema, updatePersonSchema } from '../schemas/personSchema';
import type { CreatePersonSchema, UpdatePersonSchema } from '../schemas/personSchema';
import { Person, SharedAccessLevel } from '@/app/entities/Person';

export function usePeopleController() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isNewPersonModalOpen, setIsNewPersonModalOpen] = useState(false);
  const [personToEdit, setPersonToEdit] = useState<Person | null>(null);
  const [personToRemove, setPersonToRemove] = useState<Person | null>(null);
  const [isAccessHistoryOpen, setIsAccessHistoryOpen] = useState(false);

  const createForm = useForm<CreatePersonSchema>({
    resolver: zodResolver(createPersonSchema),
    defaultValues: {
      name: '',
      email: '',
      accessLevel: SharedAccessLevel.READ_WRITE,
    },
  });

  const editForm = useForm<UpdatePersonSchema>({
    resolver: zodResolver(updatePersonSchema),
    defaultValues: {
      accessLevel: SharedAccessLevel.READ_WRITE,
    },
  });

  const createMutation = useMutation({
    mutationFn: peopleService.create,
    mutationKey: ['people', 'create'],
  });

  const updateMutation = useMutation({
    mutationFn: peopleService.update,
    mutationKey: ['people', 'update'],
  });

  const removeMutation = useMutation({
    mutationFn: peopleService.remove,
    mutationKey: ['people', 'remove'],
  });

  const openNewPersonModal = () => {
    createForm.reset({
      name: '',
      email: '',
      accessLevel: SharedAccessLevel.READ_WRITE,
    });
    setIsNewPersonModalOpen(true);
  };

  const closeNewPersonModal = () => setIsNewPersonModalOpen(false);

  const openEditPersonModal = (person: Person) => {
    setPersonToEdit(person);
    editForm.reset({ accessLevel: person.accessLevel });
  };

  const closeEditPersonModal = () => {
    setPersonToEdit(null);
  };

  const openRemoveModal = (person: Person) => setPersonToRemove(person);
  const closeRemoveModal = () => setPersonToRemove(null);

  const handleCreateSubmit = createForm.handleSubmit(async (data) => {
    try {
      await createMutation.mutateAsync(data);
      queryClient.invalidateQueries({ queryKey: ['people'] });
      closeNewPersonModal();
      toast({ title: 'Sucesso', description: 'Convite enviado com sucesso!' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: getApiErrorMessage(error) ?? 'Não foi possível enviar o convite.',
      });
    }
  });

  const handleUpdateSubmit = editForm.handleSubmit(async (data) => {
    if (!personToEdit) return;
    try {
      await updateMutation.mutateAsync({ id: personToEdit.id, accessLevel: data.accessLevel });
      queryClient.invalidateQueries({ queryKey: ['people'] });
      closeEditPersonModal();
      toast({ title: 'Sucesso', description: 'Nível de acesso atualizado.' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: getApiErrorMessage(error) ?? 'Não foi possível atualizar.',
      });
    }
  });

  const handleRemoveConfirm = async () => {
    if (!personToRemove) return;
    try {
      await removeMutation.mutateAsync(personToRemove.id);
      queryClient.invalidateQueries({ queryKey: ['people'] });
      closeRemoveModal();
      toast({ title: 'Sucesso', description: 'Pessoa removida da conta.' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: getApiErrorMessage(error) ?? 'Não foi possível remover.',
      });
    }
  };

  return {
    createForm,
    editForm,
    handleCreateSubmit,
    handleUpdateSubmit,
    isNewPersonModalOpen,
    openNewPersonModal,
    closeNewPersonModal,
    personToEdit,
    isEditPersonModalOpen: !!personToEdit,
    openEditPersonModal,
    closeEditPersonModal,
    personToRemove,
    isRemoveModalOpen: !!personToRemove,
    openRemoveModal,
    closeRemoveModal,
    handleRemoveConfirm,
    isAccessHistoryOpen,
    openAccessHistory: () => setIsAccessHistoryOpen(true),
    closeAccessHistory: () => setIsAccessHistoryOpen(false),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isRemoving: removeMutation.isPending,
  };
}
