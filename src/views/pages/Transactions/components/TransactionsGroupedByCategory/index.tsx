import { useMemo } from 'react';
import { Transaction } from '@/app/entities/Transaction';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { useCategories } from '@/app/hooks/useCategories';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/views/components/ui/accordion';
import { Skeleton } from '@/views/components/ui/skeleton';
import { CategoryIcon } from '@/views/components/icons/Categories/CategoryIcon';
import { TransactionsListActions } from '../TransactionsList';
import { TransactionsTable } from '../TransactionsTable';
import { UpdateTransactionStatus } from '../UpdateTransactionStatus';
import { TransactionsFilters } from '@/app/services/transactionsService/getAll';
import { cn } from '@/lib/utils';

interface TransactionsGroupedByCategoryProps extends TransactionsListActions {
  transactions: Transaction[];
  isLoading: boolean;
  isInitialLoading: boolean;
  filters: TransactionsFilters;
}

export function TransactionsGroupedByCategory({
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
}: TransactionsGroupedByCategoryProps) {
  const { categories } = useCategories();
  const { accounts } = useBankAccounts();

  const categoryDetailsMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])),
    [categories],
  );

  const accountMap = useMemo(
    () => Object.fromEntries(accounts.map((a) => [a.id, a.name])),
    [accounts],
  );

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
    [categories],
  );

  const groups = useMemo(() => {
    const map = new Map<string, Transaction[]>();
    for (const t of transactions) {
      const existing = map.get(t.categoryId) ?? [];
      map.set(t.categoryId, [...existing, t]);
    }
    return map;
  }, [transactions]);

  if (isInitialLoading) {
    return (
      <div className="space-y-3 w-full">
        {[1, 2, 3].map((i) => (
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
        {Array.from(groups.entries()).map(([categoryId, categoryTransactions]) => {
          const category = categoryDetailsMap[categoryId];
          const total = categoryTransactions.reduce((sum, t) => sum + t.value, 0);

          const hasIncome = categoryTransactions.some((t) => t.type === 'INCOME');
          const hasExpense = categoryTransactions.some((t) => t.type === 'EXPENSE');
          const totalColor =
            hasIncome && !hasExpense
              ? 'text-green-600'
              : hasExpense && !hasIncome
                ? 'text-red-500'
                : 'text-foreground';

          return (
            <AccordionItem
              key={categoryId}
              value={categoryId}
              className="border rounded-lg px-4 bg-card"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  {category && (
                    <CategoryIcon
                      type={category.type}
                      category={category.icon}
                      className="h-6 w-6 shrink-0"
                    />
                  )}
                  <span className="font-medium">{category?.name ?? '—'}</span>
                  <span
                    className={cn(
                      'font-semibold tabular-nums text-sm',
                      totalColor,
                      !areValuesVisible && 'blur-md select-none',
                    )}
                  >
                    {formatCurrency(total)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {categoryTransactions.length} transaç
                    {categoryTransactions.length === 1 ? 'ão' : 'ões'}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <TransactionsTable
                  transactions={categoryTransactions}
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
