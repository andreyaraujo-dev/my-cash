import { Button } from '@/views/components/ui/button';
import { Plus } from 'lucide-react';
import { TransactionStatus } from './components/TransactionsStatus';
import { useTransactionsController } from '../Dashboard/components/Transactions/useTransactionsController';
import { TransactionsList } from './components/TransactionsList';
import { TransactionsFilters } from './components/TransactionsFilters';

export function TransactionsPage() {
  const { transactions } = useTransactionsController();

  return (
    <div className="h-full flex flex-col gap-4 items-center">
      <div className="flex justify-end w-full">
        <Button className="gap-2 w-max">
          <Plus size={16} />
          Nova Transação
        </Button>
      </div>

      <TransactionsFilters />

      <TransactionStatus transactions={transactions} />

      <TransactionsList transactions={transactions} />
    </div>
  );
}
