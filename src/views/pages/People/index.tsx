import { Users, Plus } from 'lucide-react';
import { Button } from '@/views/components/ui/button';
import { usePeopleAccessHistory } from '@/app/hooks/usePeople';
import { usePeopleController } from './hooks/usePeopleController';
import { PeopleList } from './components/PeopleList';
import { NewPersonModal } from './components/NewPersonModal';
import { EditPersonModal } from './components/EditPersonModal';
import { AccessHistoryModal } from './components/AccessHistoryModal';
import { ConfirmDeleteModal } from '@/views/components/ConfirmDeleteModal';
import { Skeleton } from '@/views/components/ui/skeleton';
import { PageTour } from '@/views/components/Tour/PageTour';
import { peopleTourSteps, TOUR_IDS } from '@/views/components/Tour/tours';

export function PeoplePage() {
  const {
    createForm,
    editForm,
    handleCreateSubmit,
    handleUpdateSubmit,
    isNewPersonModalOpen,
    openNewPersonModal,
    closeNewPersonModal,
    personToEdit,
    isEditPersonModalOpen,
    openEditPersonModal,
    closeEditPersonModal,
    personToRemove,
    isRemoveModalOpen,
    openRemoveModal,
    closeRemoveModal,
    handleRemoveConfirm,
    personToViewHistory,
    isAccessHistoryOpen,
    openAccessHistory,
    closeAccessHistory,
    isCreating,
    isUpdating,
    isRemoving,
    isLoadingPeoples,
    peoples,
  } = usePeopleController();

  const { accessHistory, isFetching: isFetchingHistory } = usePeopleAccessHistory(
    !!personToViewHistory,
    personToViewHistory?.id,
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <header className="flex md:flex-row flex-col items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-bold">Pessoas com acesso</h1>
            <span className="text-sm text-muted-foreground">
              Compartilhe sua conta com família ou amigos (até 4 pessoas)
            </span>
          </div>
        </div>

        <div data-tour="new-person-btn">
          {isLoadingPeoples ? (
            <Skeleton className="h-10 w-32 rounded-md" />
          ) : (
            <Button className="gap-2 w-max" onClick={openNewPersonModal}>
              <Plus size={16} />
              Convidar pessoa
            </Button>
          )}
        </div>
      </header>

      <div data-tour="people-list">
        <PeopleList
          people={peoples}
          isLoading={isLoadingPeoples}
          onEdit={openEditPersonModal}
          onRemove={openRemoveModal}
          onViewHistory={openAccessHistory}
        />
      </div>

      <NewPersonModal
        open={isNewPersonModalOpen}
        onClose={closeNewPersonModal}
        form={createForm}
        onSubmit={handleCreateSubmit}
        isLoading={isCreating}
      />

      <EditPersonModal
        open={isEditPersonModalOpen}
        onClose={closeEditPersonModal}
        form={editForm}
        onSubmit={handleUpdateSubmit}
        isLoading={isUpdating}
        person={personToEdit}
      />

      {isRemoveModalOpen && (
        <ConfirmDeleteModal
          open={isRemoveModalOpen}
          onClose={closeRemoveModal}
          onConfirm={handleRemoveConfirm}
          title={`Tem certeza que deseja remover ${personToRemove?.name} da conta?`}
          description="A pessoa perderá o acesso aos dados compartilhados."
          isLoading={isRemoving}
        />
      )}

      <AccessHistoryModal
        open={isAccessHistoryOpen}
        onClose={closeAccessHistory}
        accessHistory={accessHistory}
        isLoading={isFetchingHistory}
        person={personToViewHistory}
      />

      <PageTour tourId={TOUR_IDS.PEOPLE} steps={peopleTourSteps} />
    </div>
  );
}
