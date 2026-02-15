import { Button } from '@/views/components/ui/button';
import { Plus } from 'lucide-react';
import { useGoalsController } from './hooks/useGoalsController';
import { GoalsFilters } from './components/GoalsFilters';
import { GoalsList } from './components/GoalsList';
import { NewGoalModal } from './components/NewGoalModal';
import { EditGoalModal } from './components/EditGoalModal';
import { GoalDetailsModal } from './components/GoalDetailsModal';
import { GoalOperationModal } from './components/GoalOperationModal';
import { ConfirmDeleteGoalModal } from './components/ConfirmDeleteGoalModal';
import { Skeleton } from '@/views/components/ui/skeleton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { goalsService } from '@/app/services/goalsService';
import { useToast } from '@/app/hooks/useToast';
import { PageTour } from '@/views/components/Tour/PageTour';
import { goalsTourSteps, TOUR_IDS } from '@/views/components/Tour/tours';

export function GoalsPage() {
  const {
    goals,
    isLoading,
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
  } = useGoalsController();

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutateAsync: deleteGoal } = useMutation({
    mutationFn: goalsService.remove,
  });

  const handleConfirmDelete = async (deleteTransactions?: boolean) => {
    if (!goalToDelete) return;

    try {
      await deleteGoal({ goalId: goalToDelete.id, deleteTransactions });

      await queryClient.invalidateQueries({ queryKey: ['goals'] });
      await queryClient.invalidateQueries({ queryKey: ['transactions'] });

      toast({
        title: 'Sucesso!',
        description: 'Meta deletada com sucesso!',
        duration: 3000,
      });

      handleCloseDeleteModal();
    } catch {
      toast({
        title: 'Erro!',
        description: 'Erro ao deletar meta. Tente novamente.',
        duration: 3000,
      });
    }
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Minhas Metas</h1>
        <div data-tour="new-goal-btn">
          {isLoading ? (
            <Skeleton className="h-10 w-32 rounded-md" />
          ) : (
            <Button onClick={handleOpenNewModal} className="w-max">
              <Plus className="w-4 h-4 mr-2" />
              Nova Meta
            </Button>
          )}
        </div>
      </header>

      <div data-tour="goals-filters">
        <GoalsFilters
          filters={filters}
          handleChangeFilters={handleChangeFilters}
          handleClearFilters={handleClearFilters}
          isLoading={isLoading}
        />
      </div>

      <div data-tour="goals-list">
        <GoalsList
          goals={goals}
          isLoading={isLoading}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          onDetails={handleOpenDetailsModal}
          onAddValue={handleOpenOperationModal}
        />
      </div>

      <NewGoalModal open={isNewModalOpen} onClose={handleCloseNewModal} />

      <EditGoalModal open={isEditModalOpen} onClose={handleCloseEditModal} goal={goalBeingEdited} />

      <GoalDetailsModal
        open={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        goal={goalForDetails}
      />

      <GoalOperationModal
        open={isOperationModalOpen}
        onClose={handleCloseOperationModal}
        goal={goalForOperation}
      />

      <ConfirmDeleteGoalModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        goalName={goalToDelete?.name ?? ''}
      />

      <PageTour tourId={TOUR_IDS.GOALS} steps={goalsTourSteps} />
    </div>
  );
}
