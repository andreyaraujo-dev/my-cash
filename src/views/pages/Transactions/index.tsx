import { TransactionStatus } from './components/TransactionsStatus';
import { TransactionsList } from './components/TransactionsList';
import { TransactionsFilters } from './components/TransactionsFilters';
import { useTransactionsController } from './hooks/useTransactionsController';
import { EditTransactionModal } from './components/EditTransactionModal';
import { TransactionsFab } from './components/TransactionsFab';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from '@/app/context/TransactionsContext';
import { Skeleton } from '@/views/components/ui/skeleton';
import { PageTour } from '@/views/components/Tour/PageTour';
import { transactionsTourSteps, TOUR_IDS } from '@/views/components/Tour/tours';
import { useEffect, useState } from 'react';
import { useSharedAccessLevel } from '@/app/hooks/useSharedAccessLevel';

export function TransactionsPage() {
  const { canCreate, canEdit } = useSharedAccessLevel();
  const {
    filters,
    isLoading,
    isInitialLoading,
    transactions,
    handleApplyFilters,
    isEditModalOpen,
    handleCloseEditModal,
    transactionBeingEdited,
    handleOpenEditModal,
    handleTogglePaid,
    transactionIdToUpdate,
    setIsOpenUpdateTransactionStatusDialog,
    isOpenUpdateTransactionStatusDialog,
  } = useTransactionsController();
  const [hasLoadedFiltersOnce, setHasLoadedFiltersOnce] = useState(false);

  useEffect(() => {
    if (!isInitialLoading) {
      setHasLoadedFiltersOnce(true);
    }
  }, [isInitialLoading]);

  return (
    <TransactionsProvider>
      <div className="h-full flex flex-col gap-4 items-center">
        {canCreate && (
          <div className="flex justify-end w-full" data-tour="new-transaction-btn">
            {isInitialLoading ? (
              <Skeleton className="h-10 w-40 rounded-md" />
            ) : (
              <TransactionsFab className="w-max px-3 h-10 text-base" buttonText="Nova Transação" />
            )}
          </div>
        )}

        <div className="w-full" data-tour="transactions-status">
          <TransactionStatus transactions={transactions} isLoading={isInitialLoading} />
        </div>

        <div className="w-full" data-tour="transactions-filters">
          <TransactionsFilters
            filters={filters}
            handleApplyFilters={handleApplyFilters}
            isLoading={isInitialLoading && !hasLoadedFiltersOnce}
          />
        </div>

        <TransactionsList
          transactions={transactions}
          isInitialLoading={isInitialLoading}
          isLoading={isLoading}
          filters={filters}
          handleOpenEditModal={handleOpenEditModal}
          handleTogglePaid={handleTogglePaid}
          transactionIdToUpdate={transactionIdToUpdate}
          setIsOpenUpdateTransactionStatusDialog={setIsOpenUpdateTransactionStatusDialog}
          isOpenUpdateTransactionStatusDialog={isOpenUpdateTransactionStatusDialog}
          canEdit={canEdit}
        />

        {canEdit && transactionBeingEdited && (
          <EditTransactionModal
            open={isEditModalOpen}
            onClose={handleCloseEditModal}
            transaction={transactionBeingEdited}
          />
        )}

        {canCreate && <NewTransactionModal />}

        <PageTour tourId={TOUR_IDS.TRANSACTIONS} steps={transactionsTourSteps} />
      </div>
    </TransactionsProvider>
  );
}
