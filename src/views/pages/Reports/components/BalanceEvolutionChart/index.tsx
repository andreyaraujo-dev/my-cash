import { Card } from '@/views/components/ui/card';
import { Skeleton } from '@/views/components/ui/skeleton';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { MONTHS } from '@/app/config/constants';
import { useAverageBalance } from '@/app/hooks/useReports';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium mb-1">{payload[0].payload.month}</p>
        <p className="text-xs text-muted-foreground">{formatCurrency(payload[0].value || 0)}</p>
      </div>
    );
  }
  return null;
}

export function BalanceEvolutionChart() {
  const { averageBalanceData, isLoadingAverageBalance } = useAverageBalance();

  const chartData = averageBalanceData?.monthlyBalances.map((item) => ({
    month: MONTHS[item.month - 1],
    balance: item.balance,
  }));

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Evolução do Saldo</h2>

      {isLoadingAverageBalance ? (
        <Skeleton className="w-full h-[300px]" />
      ) : !chartData || chartData.length === 0 ? (
        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
          Nenhum dado disponível
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" stroke="currentColor" />
            <YAxis
              className="text-xs"
              stroke="currentColor"
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `R$ ${(value / 1000).toFixed(0)}k`;
                }
                return `R$ ${value}`;
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
