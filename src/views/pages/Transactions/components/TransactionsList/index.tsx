import { Badge } from '@/views/components/ui/badge';
import { Card } from '@/views/components/ui/card';
import { TransactionItem } from './TransactionItem';
import { MONTHS } from '@/app/config/constants';
import { Skeleton } from '@/views/components/ui/skeleton';
import { Transaction } from '@/app/entities/Transaction';
import { TransactionsFilters } from '@/app/services/transactionsService/getAll';
import { UpdateTransactionStatus } from '../UpdateTransactionStatus';
import { Dispatch, SetStateAction } from 'react';

interface TransactionsListProps {
  transactions: Transaction[];
  isLoading: boolean;
  isInitialLoading: boolean;
  filters: TransactionsFilters;
  handleOpenEditModal: (_transaction: Transaction) => void;
  // eslint-disable-next-line no-unused-vars
  handleTogglePaid: (id: string) => void;
  transactionIdToUpdate: string;
  setIsOpenUpdateTransactionStatusDialog: Dispatch<SetStateAction<boolean>>;
  isOpenUpdateTransactionStatusDialog: boolean;
}

export function TransactionsList({
  transactions,
  isInitialLoading,
  isLoading,
  filters,
  handleOpenEditModal,
  handleTogglePaid,
  transactionIdToUpdate,
  setIsOpenUpdateTransactionStatusDialog,
  isOpenUpdateTransactionStatusDialog,
}: TransactionsListProps) {
  return (
    <Card className="p-6 w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Histórico de Transações</h2>
          <div className="flex gap-2">
            <Badge variant="outline">
              {MONTHS[filters.month - 1]} {filters.year}
            </Badge>
          </div>
        </div>

        {isInitialLoading || isLoading ? (
          <Skeleton className="w-full h-32 rounded-md" />
        ) : (
          <div className="space-y-1">
            {isLoading ? (
              <Skeleton className="w-full h-2/3 rounded-md" />
            ) : transactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma transação encontrada
              </div>
            ) : (
              transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onTogglePaid={() => handleTogglePaid(transaction.id)}
                  onClick={() => handleOpenEditModal(transaction)}
                />
              ))
            )}
          </div>
        )}
      </div>

      <UpdateTransactionStatus
        isOpen={isOpenUpdateTransactionStatusDialog}
        setIsOpen={setIsOpenUpdateTransactionStatusDialog}
        transactionId={transactionIdToUpdate}
      />
    </Card>
  );
}
