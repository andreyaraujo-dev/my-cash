import { useState, useMemo } from 'react';
import { useIncomeExpenses, useSavingsRate, useAverageBalance } from '@/app/hooks/useReports';
import { ReportsFilters } from '@/app/entities/Report';

export function useReportsController() {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const filters: ReportsFilters = useMemo(
    () => ({
      month: selectedMonth,
      year: selectedYear,
    }),
    [selectedMonth, selectedYear],
  );

  // Buscar dados
  const { incomeExpensesData, isLoadingIncomeExpenses } = useIncomeExpenses(filters);
  const { savingsRateData, isLoadingSavingsRate } = useSavingsRate(filters);
  const { averageBalanceData, isLoadingAverageBalance } = useAverageBalance();

  const handlePeriodChange = (value: string) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    switch (value) {
      case 'current-month':
        setSelectedMonth(currentMonth);
        setSelectedYear(currentYear);
        break;
      case 'previous-month': {
        const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
        setSelectedMonth(prevMonth);
        setSelectedYear(prevYear);
        break;
      }
      case 'current-year':
        setSelectedMonth(currentMonth);
        setSelectedYear(currentYear);
        break;
      default:
        break;
    }
  };

  return {
    filters,
    selectedMonth,
    selectedYear,
    incomeExpensesData,
    savingsRateData,
    averageBalanceData,
    isLoadingIncomeExpenses,
    isLoadingSavingsRate,
    isLoadingAverageBalance,
    handlePeriodChange,
  };
}
