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
import { useSubscription } from '@/app/hooks/useSubscription';
import { Button } from '@/views/components/ui/button';
import { Download } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export function TransactionsPage() {
  const { canCreate, canEdit } = useSharedAccessLevel();
  const { subscription } = useSubscription();
  const isPremium = Boolean(subscription?.plan === 'PREMIUM' && subscription?.isActive);
  const {
    filters,
    isLoading,
    isInitialLoading,
    transactions,
    handleApplyFilters,
    handleExport,
    isExporting,
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
  const isMobile = useIsMobile();
  useEffect(() => {
    if (!isInitialLoading) {
      setHasLoadedFiltersOnce(true);
    }
  }, [isInitialLoading]);

  return (
    <TransactionsProvider>
      <div className="h-full flex flex-col gap-4 items-center">
        {(canCreate || isPremium) && (
          <div className="flex justify-end w-full gap-2" data-tour="new-transaction-btn">
            {isInitialLoading ? (
              <Skeleton className="h-10 w-40 rounded-md" />
            ) : (
              <>
                {isPremium && (
                  <Button
                    variant="outline"
                    size="default"
                    onClick={handleExport}
                    disabled={isExporting}
                    isLoading={isExporting}
                    className={cn(
                      'h-10 px-3 gap-2 w-full md:w-max min-w-24 border-green-900 text-green-900 hover:bg-green-900 hover:text-white',
                      isMobile && 'w-full',
                    )}
                  >
                    <Download className="w-4 h-4" />
                    Exportar
                  </Button>
                )}
                {canCreate && (
                  <TransactionsFab
                    className={cn('w-max px-3 h-10 text-base', isMobile && 'w-full')}
                    buttonText="Nova Transação"
                  />
                )}
              </>
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
