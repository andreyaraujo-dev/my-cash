import { useMemo } from 'react';
import { Transaction } from '@/app/entities/Transaction';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { useCategories } from '@/app/hooks/useCategories';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/views/components/ui/accordion';
import { Skeleton } from '@/views/components/ui/skeleton';
import { TransactionsListActions } from '../TransactionsList';
import { TransactionsTable } from '../TransactionsTable';
import { UpdateTransactionStatus } from '../UpdateTransactionStatus';
import { TransactionsFilters } from '@/app/services/transactionsService/getAll';
import { cn } from '@/lib/utils';

interface TransactionsGroupedByAccountProps extends TransactionsListActions {
  transactions: Transaction[];
  isLoading: boolean;
  isInitialLoading: boolean;
  filters: TransactionsFilters;
}

export function TransactionsGroupedByAccount({
  transactions,
  isLoading,
  isInitialLoading,
  handleOpenEditModal,
  handleTogglePaid,
  transactionIdToUpdate,
  setIsOpenUpdateTransactionStatusDialog,
  isOpenUpdateTransactionStatusDialog,
  canEdit = true,
  areValuesVisible = true,
}: TransactionsGroupedByAccountProps) {
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

  const accountDetailsMap = useMemo(
    () => Object.fromEntries(accounts.map((a) => [a.id, a])),
    [accounts],
  );

  const groups = useMemo(() => {
    const map = new Map<string, Transaction[]>();
    for (const t of transactions) {
      const existing = map.get(t.bankAccountId) ?? [];
      map.set(t.bankAccountId, [...existing, t]);
    }
    return map;
  }, [transactions]);

  if (isInitialLoading) {
    return (
      <div className="space-y-3 w-full">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="w-full h-16 rounded-md" />
        ))}
      </div>
    );
  }

  if (transactions.length === 0 && !isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">Nenhuma transação encontrada</div>
    );
  }

  return (
    <div className="w-full space-y-3">
      <Accordion type="multiple" className="w-full space-y-3">
        {Array.from(groups.entries()).map(([accountId, accountTransactions]) => {
          const account = accountDetailsMap[accountId];
          const balance = account?.currentBalance ?? 0;
          const balanceColor = balance >= 0 ? 'text-green-600' : 'text-red-500';

          return (
            <AccordionItem
              key={accountId}
              value={accountId}
              className="border rounded-lg px-4 bg-card"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  {account?.color && (
                    <span
                      className="h-3 w-3 rounded-full shrink-0 border border-white/20"
                      style={{ backgroundColor: account.color }}
                    />
                  )}
                  <span className="font-medium">{account?.name ?? accountId}</span>
                  <span className={cn('font-semibold tabular-nums text-sm', balanceColor,
                    !areValuesVisible && 'blur-md select-none')}>
                    {formatCurrency(balance)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {accountTransactions.length} transaç
                    {accountTransactions.length === 1 ? 'ão' : 'ões'}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <TransactionsTable
                  transactions={accountTransactions}
                  accountMap={accountMap}
                  categoryMap={categoryMap}
                  sortable
                  canEdit={canEdit}
                  areValuesVisible={areValuesVisible}
                  handleOpenEditModal={handleOpenEditModal}
                  handleTogglePaid={handleTogglePaid}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <UpdateTransactionStatus
        isOpen={isOpenUpdateTransactionStatusDialog}
        setIsOpen={setIsOpenUpdateTransactionStatusDialog}
        transactionId={transactionIdToUpdate}
      />
    </div>
  );
}
