import { formatCurrency } from '@/app/utils/formatCurrency';
import { Card } from '@/views/components/ui/card';
import { PatrimonyCardSkeleton } from './PatrimonyCardSkeleton';

interface PatrimonyCardProps {
  totalPatrimony: number;
  isPositive: boolean;
  percentage: number;
  value: number;
  isLoading: boolean;
}

export function PatrimonyCard({
  totalPatrimony,
  isPositive,
  percentage,
  value,
  isLoading,
}: PatrimonyCardProps) {
  if (isLoading) return <PatrimonyCardSkeleton />;

  return (
    <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 mt-4">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Patrimônio Total</p>
        <p className="text-3xl font-bold text-foreground">{formatCurrency(totalPatrimony)}</p>
        <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : '-'}
          {percentage.toFixed(1)}% este mês
        </p>
        <p className="text-xs text-muted-foreground">
          {isPositive ? '+' : ''}
          {formatCurrency(value)} vs mês anterior
        </p>
      </div>
    </Card>
  );
}
