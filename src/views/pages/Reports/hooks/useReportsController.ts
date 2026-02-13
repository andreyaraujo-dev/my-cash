import { useState, useMemo, useCallback } from 'react';
import { type DateRange } from 'react-day-picker';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { useIncomeExpenses, useSavingsRate, useAverageBalance } from '@/app/hooks/useReports';
import { ReportsFilters } from '@/app/entities/Report';

function getDefaultDateRange(): DateRange {
  const now = new Date();
  return {
    from: startOfMonth(now),
    to: endOfMonth(now),
  };
}

export function useReportsController() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(getDefaultDateRange);

  const filters: ReportsFilters = useMemo(
    () => ({
      startDate: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
      endDate: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
    }),
    [dateRange],
  );

  // Buscar dados
  const { incomeExpensesData, isLoadingIncomeExpenses } = useIncomeExpenses(filters);
  const { savingsRateData, isLoadingSavingsRate } = useSavingsRate(filters);
  const { averageBalanceData, isLoadingAverageBalance } = useAverageBalance();

  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    setDateRange(range);
  }, []);

  return {
    filters,
    dateRange,
    incomeExpensesData,
    savingsRateData,
    averageBalanceData,
    isLoadingIncomeExpenses,
    isLoadingSavingsRate,
    isLoadingAverageBalance,
    handleDateRangeChange,
  };
}
