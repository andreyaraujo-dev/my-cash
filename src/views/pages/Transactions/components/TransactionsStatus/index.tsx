import { Transaction } from '@/app/entities/Transaction';
import { Card } from '@/views/components/ui/card';

interface TransactionStatusProps {
  transactions: Transaction[];
}

export function TransactionStatus({ transactions }: TransactionStatusProps) {
  const totalPaid = transactions
    .filter((t) => t.isPaid && t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.value, 0);

  const totalPending = transactions
    .filter((t) => !t.isPaid && t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.value, 0);

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
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
          <p className="text-sm text-blue-600">Total de Transações</p>
          <p className="text-2xl font-semibold text-blue-600">{transactions.length}</p>
        </div>
      </Card>
    </div>
  );
}
