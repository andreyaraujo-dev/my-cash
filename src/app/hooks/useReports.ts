import { useQuery } from '@tanstack/react-query';
import { reportsService } from '@/app/services/reportsService';
import { ReportsFilters } from '@/app/entities/Report';

export function useIncomeExpenses(filters?: ReportsFilters) {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['reports', 'income-expenses', filters],
    queryFn: () => reportsService.getIncomeExpenses(filters),
  });

  return {
    incomeExpensesData: data,
    isLoadingIncomeExpenses: isFetching || isLoading,
  };
}

export function useAverageBalance() {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['reports', 'average-balance'],
    queryFn: () => reportsService.getAverageBalance(),
  });

  return {
    averageBalanceData: data,
    isLoadingAverageBalance: isFetching || isLoading,
  };
}

export function useSavingsRate(filters?: ReportsFilters) {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['reports', 'savings-rate', filters],
    queryFn: () => reportsService.getSavingsRate(filters),
  });

  return {
    savingsRateData: data,
    isLoadingSavingsRate: isFetching || isLoading,
  };
}

export function useExpensesByCategory(filters?: ReportsFilters) {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['reports', 'expenses-by-category', filters],
    queryFn: () => reportsService.getExpensesByCategory(filters),
  });

  return {
    expensesByCategoryData: data,
    isLoadingExpensesByCategory: isFetching || isLoading,
  };
}
