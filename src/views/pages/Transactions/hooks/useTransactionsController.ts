import { useDashboard } from '@/app/hooks/useDashboard.ts';
import { useMemo, useState } from 'react';
import { Transaction } from '@/app/entities/Transaction.ts';
import { useTransactions } from '@/app/hooks/useTransactions.ts';
import { useMutation } from '@tanstack/react-query';
import { updateTransactionStatusAction } from '../actions/update-transaction-status';
import { transactionsService } from '@/app/services/transactionsService';
import { useToast } from '@/app/hooks/useToast';
import { downloadBlob } from '@/app/utils/downloadBlob';

export type TransactionsFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  categoryId?: string;
  isRecurrent?: boolean;
  type?: Transaction['type'];
  isPaid?: boolean;
  title?: string;
};

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();
  const { toast } = useToast();
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
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
    categoryId,
    isRecurrent,
    year,
    isPaid,
    month,
    type,
    title,
  }: {
    bankAccountId?: string;
    categoryId?: string;
    isRecurrent?: boolean;
    year: number;
    isPaid: boolean | undefined;
    month?: number;
    type?: Transaction['type'];
    title?: string;
  }) {
    setFilters((prevState) => ({
      ...prevState,
      bankAccountId,
      categoryId,
      isRecurrent,
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

  async function handleExport() {
    try {
      setIsExporting(true);
      const blob = await transactionsService.export(filters);
      downloadBlob(blob, `transacoes-${filters.month}-${filters.year}.xlsx`);
      toast({ title: 'Sucesso', description: 'Transações exportadas com sucesso.' });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível exportar as transações.',
      });
    } finally {
      setIsExporting(false);
    }
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
    handleExport,
    isExporting,
  };
}
