import { useDashboard } from '@/app/hooks/useDashboard.ts';
import { useMemo, useState } from 'react';
import { Transaction } from '@/app/entities/Transaction.ts';
import { useTransactions } from '@/app/hooks/useTransactions.ts';
import { useMutation } from '@tanstack/react-query';
import { updateTransactionStatusAction } from '../actions/update-transaction-status';

export type TransactionsFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
  isPaid?: boolean;
  title?: string;
};

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [isOpenUpdateTransactionStatusDialog, setIsOpenUpdateTransactionStatusDialog] =
    useState(false);
  const [transactionIdToUpdate, setTransactionIdToUpdate] = useState('');

  const handleTogglePaid = (id: string) => {
    setIsOpenUpdateTransactionStatusDialog(true);
    setTransactionIdToUpdate(id);
  };

  const { transactions, isLoading, isInitialLoading } = useTransactions(filters);

  function handleApplyFilters({
    bankAccountId,
    year,
    isPaid,
    month,
    type,
    title,
  }: {
    bankAccountId?: string | undefined;
    year: number;
    isPaid: boolean | undefined;
    month?: number;
    type?: Transaction['type'];
    title?: string;
  }) {
    setFilters((prevState) => ({
      ...prevState,
      bankAccountId,
      year,
      isPaid,
      title,
      month: month ?? prevState.month,
      type,
    }));

    handleCloseFiltersModal();
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditModal(transaction: Transaction) {
    setIsEditModalOpen(true);
    setTransactionBeingEdited(transaction);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setTransactionBeingEdited(null);
  }

  const hasTransactions = transactions.length > 0;

  const {
    mutateAsync: updateTransactionStatus,
    isPending: isLoadingUpdateTransactionStatus,
    isError: isErrorUpdateTransactionStatus,
  } = useMutation({
    mutationKey: ['update-transaction-status', transactionIdToUpdate],
    mutationFn: updateTransactionStatusAction,
  });

  const totalExpenses = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === 'EXPENSE') {
        return total + transaction.value;
      }
      return total;
    }, 0);
  }, [transactions]);

  const totalIncome = useMemo(() => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === 'INCOME') {
        return total + transaction.value;
      }
      return total;
    }, 0);
  }, [transactions]);

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    filters,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleApplyFilters,
    hasTransactions,
    handleOpenEditModal,
    handleCloseEditModal,
    isEditModalOpen,
    transactionBeingEdited,
    totalIncome,
    totalExpenses,
    isOpenUpdateTransactionStatusDialog,
    setIsOpenUpdateTransactionStatusDialog,
    transactionIdToUpdate,
    handleTogglePaid,
    updateTransactionStatus,
    isErrorUpdateTransactionStatus,
    isLoadingUpdateTransactionStatus,
  };
}
