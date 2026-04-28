import { useEffect, useState } from 'react';
import { Download, Landmark, LayoutList, Tag } from 'lucide-react';

import { TransactionStatus } from './components/TransactionsStatus';
import { TransactionsList } from './components/TransactionsList';
import { TransactionsFilters } from './components/TransactionsFilters';
import { TransactionsGroupedByAccount } from './components/TransactionsGroupedByAccount';
import { TransactionsGroupedByCategory } from './components/TransactionsGroupedByCategory';
import { useTransactionsController } from './hooks/useTransactionsController';
import { EditTransactionModal } from './components/EditTransactionModal';
import { TransactionsFab } from './components/TransactionsFab';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from '@/app/context/TransactionsContext';
import { Skeleton } from '@/views/components/ui/skeleton';
import { PageTour } from '@/views/components/Tour/PageTour';
import { transactionsTourSteps, TOUR_IDS } from '@/views/components/Tour/tours';
import { useSharedAccessLevel } from '@/app/hooks/useSharedAccessLevel';
import { useSubscription } from '@/app/hooks/useSubscription';
import { Button } from '@/views/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type ViewMode = 'flat' | 'by-account' | 'by-category';

const VIEW_MODES: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
  { mode: 'flat', icon: <LayoutList size={16} />, label: 'Tabela' },
  { mode: 'by-account', icon: <Landmark size={16} />, label: 'Por conta' },
  { mode: 'by-category', icon: <Tag size={16} />, label: 'Por categoria' },
];

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
    areValuesVisible,
  } = useTransactionsController();

  const [hasLoadedFiltersOnce, setHasLoadedFiltersOnce] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('flat');
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isInitialLoading) {
      setHasLoadedFiltersOnce(true);
    }
  }, [isInitialLoading]);

  const sharedListProps = {
    isLoading,
    isInitialLoading,
    filters,
    handleOpenEditModal,
    handleTogglePaid,
    transactionIdToUpdate,
    setIsOpenUpdateTransactionStatusDialog,
    isOpenUpdateTransactionStatusDialog,
    canEdit,
    areValuesVisible,
  };

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

        <div className="flex items-center justify-between w-full">
          <p className="text-sm text-muted-foreground">
            {isInitialLoading
              ? ''
              : `${transactions.length} transaç${transactions.length === 1 ? 'ão' : 'ões'}`}
          </p>
          <div className="flex items-center gap-1 bg-muted rounded-md p-1">
            {VIEW_MODES.map(({ mode, icon, label }) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                title={label}
                className={cn(
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors',
                  viewMode === mode
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'flat' && (
          <TransactionsList transactions={transactions} sortable {...sharedListProps} />
        )}

        {viewMode === 'by-account' && (
          <TransactionsGroupedByAccount transactions={transactions} {...sharedListProps} />
        )}

        {viewMode === 'by-category' && (
          <TransactionsGroupedByCategory transactions={transactions} {...sharedListProps} />
        )}

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
