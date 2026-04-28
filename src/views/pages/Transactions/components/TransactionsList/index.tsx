import { Dispatch, SetStateAction, useMemo } from 'react';

import { Transaction } from '@/app/entities/Transaction';
import { TransactionsFilters } from '@/app/services/transactionsService/getAll';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { useCategories } from '@/app/hooks/useCategories';

import { Skeleton } from '@/views/components/ui/skeleton';
import { UpdateTransactionStatus } from '../UpdateTransactionStatus';
import { TransactionsTable } from '../TransactionsTable';

export interface TransactionsListActions {
  handleOpenEditModal: (_transaction: Transaction) => void;
  // eslint-disable-next-line no-unused-vars
  handleTogglePaid: (id: string) => void;
  transactionIdToUpdate: string;
  setIsOpenUpdateTransactionStatusDialog: Dispatch<SetStateAction<boolean>>;
  isOpenUpdateTransactionStatusDialog: boolean;
  canEdit?: boolean;
  areValuesVisible?: boolean;
}

interface TransactionsListProps extends TransactionsListActions {
  transactions: Transaction[];
  isLoading: boolean;
  isInitialLoading: boolean;
  filters: TransactionsFilters;
  sortable?: boolean;
}

export function TransactionsList({
  transactions,
  isInitialLoading,
  isLoading,
  filters: _filters,
  handleOpenEditModal,
  handleTogglePaid,
  transactionIdToUpdate,
  setIsOpenUpdateTransactionStatusDialog,
  isOpenUpdateTransactionStatusDialog,
  canEdit = true,
  areValuesVisible = true,
  sortable = false,
}: TransactionsListProps) {
  const { accounts } = useBankAccounts();
  const { categories } = useCategories();

  const accountMap = useMemo(
    () => Object.fromEntries(accounts.map((a) => [a.id, a.name])),
    [accounts],
  );

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
    [categories],
  );

  return (
    <>
      {isInitialLoading || isLoading ? (
        <Skeleton className="w-full h-32 rounded-md" />
      ) : (
        <TransactionsTable
          transactions={transactions}
          accountMap={accountMap}
          categoryMap={categoryMap}
          sortable={sortable}
          canEdit={canEdit}
          areValuesVisible={areValuesVisible}
          handleOpenEditModal={handleOpenEditModal}
          handleTogglePaid={handleTogglePaid}
        />
      )}

      <UpdateTransactionStatus
        isOpen={isOpenUpdateTransactionStatusDialog}
        setIsOpen={setIsOpenUpdateTransactionStatusDialog}
        transactionId={transactionIdToUpdate}
      />
    </>
  );
}
