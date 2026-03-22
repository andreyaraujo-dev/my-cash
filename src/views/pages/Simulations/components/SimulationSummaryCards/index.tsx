import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { MetricCard } from '@/views/pages/Reports/components/MetricCard';
import { formatCurrency } from '@/app/utils/formatCurrency';
import type { SimulateResponse } from '@/app/entities/Simulation';

interface SimulationSummaryCardsProps {
  result: SimulateResponse;
}

export function SimulationSummaryCards({ result }: SimulationSummaryCardsProps) {
  const { baseProjection, simulatedProjection } = result;

  const lastBase = baseProjection[baseProjection.length - 1];
  const lastSimulated = simulatedProjection[simulatedProjection.length - 1];

  const balanceDiff = lastSimulated ? lastSimulated.balance - (lastBase?.balance ?? 0) : 0;
  const isPositive = balanceDiff >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCard
        title="Saldo final (base)"
        value={formatCurrency(lastBase?.balance ?? 0)}
        subtitle="Projeção sem simulação"
        icon={Wallet}
        colorClass="bg-muted/50 border border-border"
      />
      <MetricCard
        title="Saldo final (simulado)"
        value={formatCurrency(lastSimulated?.balance ?? 0)}
        subtitle="Projeção com simulação"
        icon={Wallet}
        colorClass="bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400"
      />
      <MetricCard
        title="Diferença"
        value={formatCurrency(balanceDiff)}
        subtitle={isPositive ? 'Impacto positivo' : 'Impacto negativo'}
        icon={isPositive ? TrendingUp : TrendingDown}
        colorClass={
          isPositive
            ? 'bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400'
            : 'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400'
        }
      />
    </div>
  );
}
