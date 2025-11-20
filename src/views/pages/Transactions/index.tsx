import { TransactionStatus } from './components/TransactionsStatus';
import { TransactionsList } from './components/TransactionsList';
import { TransactionsFilters } from './components/TransactionsFilters';
import { useTransactionsController } from './hooks/useTransactionsController';
import { EditTransactionModal } from './components/EditTransactionModal';
import { Fab } from '../Dashboard/components/Fab';
import { NewTransactionModal } from '../Dashboard/components/Modals/NewTransactionModal';
import { DashboardProvider } from '@/app/context/DashboardContext';

export function TransactionsPage() {
  const {
    filters,
    isLoading,
    isInitialLoading,
    transactions,
    handleChangeFilters,
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

  return (
    <div className="h-full flex flex-col gap-4 items-center">
      <div className="flex justify-end w-full">
        <DashboardProvider>
          <Fab className="w-max px-3 h-10 text-base" buttonText="Nova Transação" />
          <NewTransactionModal />
        </DashboardProvider>
      </div>

      <TransactionsFilters
        filters={filters}
        handleChangeFilters={handleChangeFilters}
        handleApplyFilters={handleApplyFilters}
      />

      <TransactionStatus transactions={transactions} />

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
      />

      {transactionBeingEdited && (
        <EditTransactionModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          transaction={transactionBeingEdited}
        />
      )}
    </div>
  );
}
