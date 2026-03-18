import { Card } from '@/views/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { MONTHS } from '@/app/config/constants';
import type { SimulateResponse } from '@/app/entities/Simulation';

interface ProjectionChartProps {
  result: SimulateResponse;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium mb-2">{data.month}</p>
        <p className="text-xs text-muted-foreground">Base: {formatCurrency(data.baseBalance)}</p>
        <p className="text-xs text-muted-foreground">Simulado: {formatCurrency(data.simBalance)}</p>
      </div>
    );
  }
  return null;
}

export function ProjectionChart({ result }: ProjectionChartProps) {
  const { baseProjection, simulatedProjection } = result;

  const chartData = baseProjection.map((base, i) => {
    const sim = simulatedProjection[i];
    return {
      month: `${MONTHS[base.month - 1]}/${String(base.year).slice(2)}`,
      baseBalance: base.balance,
      simBalance: sim?.balance ?? 0,
    };
  });

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Evolução do saldo</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="month" className="text-xs" stroke="currentColor" />
          <YAxis
            className="text-xs"
            stroke="currentColor"
            tickFormatter={(value) => {
              if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}k`;
              return `R$ ${value}`;
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="baseBalance"
            name="Base"
            stroke="#94a3b8"
            strokeWidth={2}
            dot={{ fill: '#94a3b8', r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="simBalance"
            name="Simulado"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
