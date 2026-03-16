import { Users, Plus, History } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/views/components/ui/card';
import { Button } from '@/views/components/ui/button';
import { usePeople } from '@/app/hooks/usePeople';
import { usePeopleAccessHistory } from '@/app/hooks/usePeople';
import { usePeopleController } from './hooks/usePeopleController';
import { PeopleList } from './components/PeopleList';
import { NewPersonModal } from './components/NewPersonModal';
import { EditPersonModal } from './components/EditPersonModal';
import { AccessHistoryModal } from './components/AccessHistoryModal';
import { ConfirmDeleteModal } from '@/views/components/ConfirmDeleteModal';

export function PeoplePage() {
  const { people, isFetching } = usePeople();

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
    isAccessHistoryOpen,
    openAccessHistory,
    closeAccessHistory,
    isCreating,
    isUpdating,
    isRemoving,
  } = usePeopleController();

  const { accessHistory, isFetching: isFetchingHistory } = usePeopleAccessHistory(
    isAccessHistoryOpen,
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <div>
            <CardTitle>Pessoas com acesso</CardTitle>
            <CardDescription>
              Compartilhe sua conta com família ou amigos (até 4 pessoas)
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button className="gap-2" onClick={openNewPersonModal}>
              <Plus size={16} />
              Convidar pessoa
            </Button>
            <Button variant="outline" className="gap-2" onClick={openAccessHistory}>
              <History size={16} />
              Ver histórico de acesso
            </Button>
          </div>

          <PeopleList
            people={people}
            isLoading={isFetching}
            onEdit={openEditPersonModal}
            onRemove={openRemoveModal}
          />
        </CardContent>
      </Card>

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
      />
    </div>
  );
}
