import { Badge } from '@/views/components/ui/badge';
import { Card } from '@/views/components/ui/card';
import { TransactionItem } from './TransactionItem';
import { MONTHS } from '@/app/config/constants';
import { Skeleton } from '@/views/components/ui/skeleton';
import { Transaction } from '@/app/entities/Transaction';
import { TransactionsFilters } from '@/app/services/transactionsService/getAll';

interface TransactionsListProps {
  transactions: Transaction[];
  isLoading: boolean;
  isInitialLoading: boolean;
  filters: TransactionsFilters;
}

export function TransactionsList({
  transactions,
  isInitialLoading,
  isLoading,
  filters,
}: TransactionsListProps) {
  const togglePaid = (id: string) => {
    // TODO: implement function
    console.log(id);
  };

  if (isInitialLoading) {
    return (
      <Card className="p-6 w-full">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Histórico de Transações</h2>
            <div className="flex gap-2">
              <Badge variant="outline">
                {MONTHS[filters.month]} {filters.year}
              </Badge>
            </div>
          </div>
          <Skeleton className="w-full h-32 rounded-md" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Histórico de Transações</h2>
          <div className="flex gap-2">
            <Badge variant="outline">
              {MONTHS[filters.month]} {filters.year}
            </Badge>
          </div>
        </div>

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
                onTogglePaid={() => togglePaid(transaction.id)}
              />
            ))
          )}
        </div>
      </div>
    </Card>
  );
}
