import { useState } from 'react';
import { Goal } from '@/app/entities/Goal';
import { useGoals } from '@/app/hooks/useGoals';
import { GoalsFilters } from '@/app/services/goalsService/getAll';

export function useGoalsController() {
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isOperationModalOpen, setIsOperationModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [goalBeingEdited, setGoalBeingEdited] = useState<Goal | null>(null);
  const [goalForDetails, setGoalForDetails] = useState<Goal | null>(null);
  const [goalForOperation, setGoalForOperation] = useState<Goal | null>(null);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);

  const [filters, setFilters] = useState<GoalsFilters>({});

  const { goals, isLoading } = useGoals(filters);

  function handleChangeFilters<TFilter extends keyof GoalsFilters>(filter: TFilter) {
    return (value: GoalsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleClearFilters() {
    setFilters({});
  }

  function handleOpenNewModal() {
    setIsNewModalOpen(true);
  }

  function handleCloseNewModal() {
    setIsNewModalOpen(false);
  }

  function handleOpenEditModal(goal: Goal) {
    setIsEditModalOpen(true);
    setGoalBeingEdited(goal);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setGoalBeingEdited(null);
  }

  function handleOpenDetailsModal(goal: Goal) {
    setIsDetailsModalOpen(true);
    setGoalForDetails(goal);
  }

  function handleCloseDetailsModal() {
    setIsDetailsModalOpen(false);
    setGoalForDetails(null);
  }

  function handleOpenOperationModal(goal: Goal) {
    setIsOperationModalOpen(true);
    setGoalForOperation(goal);
  }

  function handleCloseOperationModal() {
    setIsOperationModalOpen(false);
    setGoalForOperation(null);
  }

  function handleOpenDeleteModal(goal: Goal) {
    setIsDeleteModalOpen(true);
    setGoalToDelete(goal);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setGoalToDelete(null);
  }

  const hasGoals = goals.length > 0;

  return {
    goals,
    isLoading,
    hasGoals,
    filters,
    handleChangeFilters,
    handleClearFilters,
    isNewModalOpen,
    handleOpenNewModal,
    handleCloseNewModal,
    isEditModalOpen,
    handleOpenEditModal,
    handleCloseEditModal,
    goalBeingEdited,
    isDetailsModalOpen,
    handleOpenDetailsModal,
    handleCloseDetailsModal,
    goalForDetails,
    isOperationModalOpen,
    handleOpenOperationModal,
    handleCloseOperationModal,
    goalForOperation,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    goalToDelete,
  };
}
