import { Transaction } from '@/app/entities/Transaction';
import { Badge } from '@/views/components/ui/badge';
import { Card } from '@/views/components/ui/card';
import { TransactionItem } from './TransactionItem';

interface TransactionsListProps {
  transactions: Transaction[];
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  const togglePaid = (id: string) => {
    // TODO: implement function
    console.log(id);
  };

  return (
    <Card className="p-6 w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Histórico de Transações</h2>
          <div className="flex gap-2">
            <Badge variant="outline">Set 2025</Badge>
          </div>
        </div>

        <div className="space-y-1">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onTogglePaid={() => togglePaid(transaction.id)}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
