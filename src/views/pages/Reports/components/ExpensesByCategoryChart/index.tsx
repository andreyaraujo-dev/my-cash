import { Card } from '@/views/components/ui/card';
import { Skeleton } from '@/views/components/ui/skeleton';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { useExpensesByCategory } from '@/app/hooks/useReports';
import { ReportsFilters } from '@/app/entities/Report';

const COLORS = [
  '#8b5cf6', // roxo - Alimentação
  '#f59e0b', // amarelo - Moradia
  '#10b981', // verde - Transporte
  '#ef4444', // vermelho - Saúde
  '#ec4899', // rosa - Lazer
  '#3b82f6', // azul - Outros
  '#6366f1', // indigo
  '#14b8a6', // teal
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium mb-1">{data.categoryName}</p>
        <p className="text-xs text-muted-foreground">
          {formatCurrency(data.amount)} ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
}

interface ExpensesByCategoryChartProps {
  filters?: ReportsFilters;
}

export function ExpensesByCategoryChart({ filters }: ExpensesByCategoryChartProps) {
  const { expensesByCategoryData, isLoadingExpensesByCategory } = useExpensesByCategory(filters);

  const chartData = expensesByCategoryData?.categories.map((category) => ({
    categoryName: category.categoryName,
    amount: category.amount,
    percentage: category.percentage,
    categoryIcon: category.categoryIcon,
  }));

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Gastos por Categoria</h2>

      {isLoadingExpensesByCategory ? (
        <Skeleton className="w-full h-[300px]" />
      ) : !chartData || chartData.length === 0 ? (
        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
          Nenhum dado disponível
        </div>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="amount"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {chartData.map((category, index) => (
              <div key={category.categoryName} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-xs truncate">{category.categoryName}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
