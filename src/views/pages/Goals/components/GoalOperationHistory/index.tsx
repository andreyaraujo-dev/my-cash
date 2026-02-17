import { useGoalOperations } from '@/app/hooks/useGoalOperations';
import { Skeleton } from '@/views/components/ui/skeleton';
import { ArrowDown, ArrowUp, History } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GoalOperation } from '@/app/entities/GoalOperation';

interface GoalOperationHistoryProps {
  goalId: string;
}

export function GoalOperationHistory({ goalId }: GoalOperationHistoryProps) {
  const { operations, isLoading } = useGoalOperations(goalId);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const getOperationIcon = (type: GoalOperation['type']) => {
    if (type === 'DEPOSIT') {
      return <ArrowUp className="w-4 h-4 text-green-500" />;
    }
    return <ArrowDown className="w-4 h-4 text-red-500" />;
  };

  const getOperationLabel = (type: GoalOperation['type']) => {
    return type === 'DEPOSIT' ? 'Depósito' : 'Retirada';
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Histórico de Operações</h3>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-16 rounded-lg" />
        ))}
      </div>
    );
  }

  if (operations.length === 0) {
    return (
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Histórico de Operações</h3>
        <div className="flex flex-col items-center justify-center py-8 text-center bg-muted/50 rounded-lg">
          <div className="rounded-full bg-muted p-4 mb-3">
            <History className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">Nenhuma operação realizada ainda</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">Histórico de Operações</h3>
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {operations.map((operation) => (
          <div
            key={operation.id}
            className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="mt-1">{getOperationIcon(operation.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{getOperationLabel(operation.type)}</p>
                  {operation.bankAccount && (
                    <p className="text-sm text-muted-foreground truncate">{operation.bankAccount.name}</p>
                  )}
                  {operation.description && (
                    <p className="text-xs text-muted-foreground mt-1 truncate">{operation.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      operation.type === 'DEPOSIT' ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {operation.type === 'DEPOSIT' ? '+' : '-'} {formatCurrency(operation.value)}
                  </p>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDate(operation.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
