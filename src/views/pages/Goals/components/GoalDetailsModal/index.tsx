import { Goal } from '@/app/entities/Goal';
import { Modal } from '@/views/components/Modal';
import { Badge } from '@/views/components/ui/badge';
import { Progress } from '@/views/components/ui/progress';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GoalOperationHistory } from '../GoalOperationHistory';

interface GoalDetailsModalProps {
  open: boolean;
  onClose: () => void;
  goal: Goal | null;
}

function safeNumber(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function GoalDetailsModal({ open, onClose, goal }: GoalDetailsModalProps) {
  if (!goal) return null;

  const targetValue = safeNumber(goal.targetValue);
  const currentValue = safeNumber(goal.currentValue);
  const progress = targetValue === 0 ? 0 : (currentValue / targetValue) * 100;

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    return 'bg-orange-500';
  };

  const getStatusVariant = (status: Goal['status']) => {
    const variants = {
      PENDING: 'secondary',
      IN_PROGRESS: 'default',
      COMPLETED: 'default',
      CANCELLED: 'destructive',
    } as const;
    return variants[status];
  };

  const getStatusLabel = (status: Goal['status']) => {
    const labels = {
      PENDING: 'Pendente',
      IN_PROGRESS: 'Em Progresso',
      COMPLETED: 'Concluída',
      CANCELLED: 'Cancelada',
    };
    return labels[status];
  };

  const getImportanceLabel = (importance: Goal['importance']) => {
    const labels = {
      LOW: 'Baixa',
      MEDIUM: 'Média',
      HIGH: 'Alta',
    };
    return labels[importance];
  };

  const getPriorityLabel = (priority: Goal['priority']) => {
    const labels = {
      LOW: 'Baixa',
      MEDIUM: 'Média',
      HIGH: 'Alta',
      URGENT: 'Urgente',
    };
    return labels[priority];
  };

  const getPriorityVariant = (priority: Goal['priority']) => {
    const variants = {
      LOW: 'secondary',
      MEDIUM: 'default',
      HIGH: 'default',
      URGENT: 'destructive',
    } as const;
    return variants[priority];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
    <Modal open={open} title="Detalhes da Meta" onClose={onClose}>
      <div className="space-y-6">
        {/* Informações básicas */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{goal.name}</h2>
          {goal.category && (
            <div className="flex items-center gap-2 text-zinc-400">
              <span>{goal.category.icon}</span>
              <span>{goal.category.name}</span>
            </div>
          )}
        </div>

        {/* Progresso */}
        <div className="space-y-3 bg-zinc-800/50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Progresso da Meta</span>
            <span className="font-semibold text-lg">{progress.toFixed(1)}%</span>
          </div>
          <Progress
            value={currentValue}
            max={targetValue || 1}
            indicatorClassName={getProgressColor(progress)}
            className="h-3"
          />
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-zinc-400">Valor Atual</p>
              <p className="font-semibold text-lg">{formatCurrency(currentValue)}</p>
            </div>
            <div className="text-right">
              <p className="text-zinc-400">Valor Alvo</p>
              <p className="font-semibold text-lg">{formatCurrency(targetValue)}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-zinc-700">
            <p className="text-zinc-400 text-sm">Falta alcançar</p>
            <p className="font-semibold text-lg">
              {formatCurrency(Math.max(0, targetValue - currentValue))}
            </p>
          </div>
        </div>

        {/* Data de vencimento */}
        <div className="flex items-center gap-2 text-zinc-400 bg-zinc-800/50 p-3 rounded-lg">
          <Calendar className="w-5 h-5" />
          <div>
            <p className="text-xs text-zinc-500">Vencimento</p>
            <p className="font-medium text-white">{formatDate(goal.dueDate)}</p>
          </div>
        </div>

        {/* Badges */}
        <div>
          <p className="text-sm text-zinc-400 mb-2">Status e Prioridades</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant={getStatusVariant(goal.status)}>{getStatusLabel(goal.status)}</Badge>
            <Badge variant="outline">Importância: {getImportanceLabel(goal.importance)}</Badge>
            <Badge variant={getPriorityVariant(goal.priority)}>
              Prioridade: {getPriorityLabel(goal.priority)}
            </Badge>
          </div>
        </div>

        {/* Descrição */}
        {goal.description && (
          <div>
            <p className="text-sm text-zinc-400 mb-2">Descrição</p>
            <p className="text-zinc-300 bg-zinc-800/50 p-3 rounded-lg">{goal.description}</p>
          </div>
        )}

        {/* Histórico de operações */}
        <div className="border-t border-zinc-800 pt-4">
          <GoalOperationHistory goalId={goal.id} />
        </div>
      </div>
    </Modal>
  );
}
