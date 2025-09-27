import { useDashboard } from '@/app/hooks/useDashboard.ts';
import { useEffect, useMemo, useState } from 'react';
import { Transaction } from '@/app/entities/Transaction.ts';
import { useTransactions } from '@/app/hooks/useTransactions.ts';

export type TransactionsFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
  isPaid?: boolean;
};

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isOpenUpdateTransactionStatusDialog, setIsOpenUpdateTransactionStatusDialog] =
    useState(false);
  const [transactionIdToUpdate, setTransactionIdToUpdate] = useState('');
  const handleTogglePaid = (id: string) => {
    setIsOpenUpdateTransactionStatusDialog(true);
    setTransactionIdToUpdate(id);
  };

  useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  const { transactions, isLoading, isInitialLoading } = useTransactions(filters, shouldFetch);

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(filter: TFilter) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleApplyFilters({
    bankAccountId,
    year,
    isPaid,
    month,
    type,
  }: {
    bankAccountId?: string | undefined;
    year: number;
    isPaid: boolean | undefined;
    month?: number;
    type?: Transaction['type'];
  }) {
    handleChangeFilters('bankAccountId')(bankAccountId);
    handleChangeFilters('year')(year);
    handleChangeFilters('isPaid')(isPaid);
    if (month) handleChangeFilters('month')(month);
    if (type) handleChangeFilters('type')(type);
    setShouldFetch(true);
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
    handleChangeFilters,
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
    setShouldFetch,
  };
}
