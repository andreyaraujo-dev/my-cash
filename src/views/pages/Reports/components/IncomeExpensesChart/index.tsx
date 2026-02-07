import { Card } from '@/views/components/ui/card';
import { Skeleton } from '@/views/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { MONTHS } from '@/app/config/constants';
import { useIncomeExpenses } from '@/app/hooks/useReports';
import { useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium mb-2">{payload[0].payload.month}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-green-500" />
            <span className="text-xs text-muted-foreground">Receitas:</span>
            <span className="text-xs font-medium">{formatCurrency(payload[0].value || 0)}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-red-500" />
            <span className="text-xs text-muted-foreground">Despesas:</span>
            <span className="text-xs font-medium">{formatCurrency(payload[1]?.value || 0)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function IncomeExpensesChart() {
  // Buscar dados dos últimos 3 meses
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  // Calcular os 3 meses anteriores
  const months = useMemo(() => {
    const result = [];
    for (let i = 2; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1 - i, 1);
      result.push({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      });
    }
    return result;
  }, [currentMonth, currentYear]);

  // Buscar dados para cada mês
  const month1Data = useIncomeExpenses({ month: months[0].month, year: months[0].year });
  const month2Data = useIncomeExpenses({ month: months[1].month, year: months[1].year });
  const month3Data = useIncomeExpenses({ month: months[2].month, year: months[2].year });

  const isLoading =
    month1Data.isLoadingIncomeExpenses ||
    month2Data.isLoadingIncomeExpenses ||
    month3Data.isLoadingIncomeExpenses;

  const chartData = useMemo(() => {
    if (
      !month1Data.incomeExpensesData ||
      !month2Data.incomeExpensesData ||
      !month3Data.incomeExpensesData
    ) {
      return [];
    }

    return [
      {
        month: MONTHS[months[0].month - 1],
        income: month1Data.incomeExpensesData.currentPeriod.income,
        expense: month1Data.incomeExpensesData.currentPeriod.expense,
      },
      {
        month: MONTHS[months[1].month - 1],
        income: month2Data.incomeExpensesData.currentPeriod.income,
        expense: month2Data.incomeExpensesData.currentPeriod.expense,
      },
      {
        month: MONTHS[months[2].month - 1],
        income: month3Data.incomeExpensesData.currentPeriod.income,
        expense: month3Data.incomeExpensesData.currentPeriod.expense,
      },
    ];
  }, [
    month1Data.incomeExpensesData,
    month2Data.incomeExpensesData,
    month3Data.incomeExpensesData,
    months,
  ]);

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Receitas vs Despesas</h2>

      {isLoading ? (
        <Skeleton className="w-full h-[300px]" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
            <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
