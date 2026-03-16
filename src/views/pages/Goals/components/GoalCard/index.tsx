/* eslint-disable no-unused-vars */
import { Goal } from '@/app/entities/Goal';
import { Badge } from '@/views/components/ui/badge';
import { Button } from '@/views/components/ui/button';
import { Card, CardContent, CardHeader } from '@/views/components/ui/card';
import { Progress } from '@/views/components/ui/progress';
import { Calendar, Edit2, Eye, Plus, Trash2 } from 'lucide-react';
import { useSharedAccessLevel } from '@/app/hooks/useSharedAccessLevel';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface GoalCardProps {
  goal: Goal;
  onEdit?: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
  onDetails: (goal: Goal) => void;
  onAddValue?: (goal: Goal) => void;
}

function safeNumber(value: unknown): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function GoalCard({ goal, onEdit, onDelete, onDetails, onAddValue }: GoalCardProps) {
  const { canDelete } = useSharedAccessLevel();
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
    <Card className="hover:border-muted-foreground/30 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{goal.name}</h3>
            {goal.category && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <span>{goal.category.icon}</span>
                <span>{goal.category.name}</span>
              </div>
            )}
          </div>
          <div className="flex gap-1">
            {onAddValue && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onAddValue(goal)}
                className="h-8 w-8"
                title="Adicionar Valor"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDetails(goal)}
              className="h-8 w-8"
              title="Ver Detalhes"
            >
              <Eye className="w-4 h-4" />
            </Button>
            {onEdit && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(goal)}
                className="h-8 w-8"
                title="Editar"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
            )}
            {canDelete && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(goal)}
                className="h-8 w-8 text-red-500 hover:text-red-600"
                title="Deletar"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progresso */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-semibold">
              {formatCurrency(currentValue)} / {formatCurrency(targetValue)}
            </span>
          </div>
          <Progress
            value={currentValue}
            max={targetValue || 1}
            indicatorClassName={getProgressColor(progress)}
          />
          <div className="text-right text-xs text-muted-foreground">{progress.toFixed(1)}% atingido</div>
        </div>

        {/* Data de vencimento */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Vence em {formatDate(goal.dueDate)}</span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant={getStatusVariant(goal.status)}>{getStatusLabel(goal.status)}</Badge>
          <Badge variant="outline">Importância: {getImportanceLabel(goal.importance)}</Badge>
          <Badge variant={getPriorityVariant(goal.priority)}>
            {getPriorityLabel(goal.priority)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
