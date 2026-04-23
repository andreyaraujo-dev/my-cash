import { useMemo } from 'react';
import { Transaction } from '@/app/entities/Transaction';
import { Card } from '@/views/components/ui/card';
import { Skeleton } from '@/views/components/ui/skeleton';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';

interface TransactionStatusProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export function TransactionStatus({ transactions, isLoading }: TransactionStatusProps) {
  const { accounts, isPending: isLoadingAccounts } = useBankAccounts();

  const totalPaid = transactions
    .filter((t) => t.isPaid && t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.value, 0);

  const totalPending = transactions
    .filter((t) => !t.isPaid && t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.value, 0);

  const totalBalance = useMemo(
    () => accounts.reduce((sum, a) => sum + a.currentBalance, 0),
    [accounts],
  );

  if (isLoading || isLoadingAccounts) {
    return (
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-36" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4 w-full">
      <Card className="p-4 bg-green-500/10 border-green-500/20">
        <div className="space-y-1">
          <p className="text-sm text-green-600">Despesas Pagas</p>
          <p className="text-2xl font-semibold text-green-600">
            R$ {totalPaid.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </Card>
      <Card className="p-4 bg-orange-500/10 border-orange-500/20">
        <div className="space-y-1">
          <p className="text-sm text-orange-600">Despesas Pendentes</p>
          <p className="text-2xl font-semibold text-orange-600">
            R$ {totalPending.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </Card>
      <Card className="p-4 bg-blue-500/10 border-blue-500/20">
        <div className="space-y-1">
          <p className="text-sm text-blue-600">Saldo Atual</p>
          <p className="text-2xl font-semibold text-blue-600">
            R$ {totalBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </Card>
    </div>
  );
}
