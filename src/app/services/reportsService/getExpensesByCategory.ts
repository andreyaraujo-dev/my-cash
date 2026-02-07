import { ExpensesByCategoryReport, ReportsFilters } from '@/app/entities/Report';
import { httpClient } from '@/app/services/httpClient';

export async function getExpensesByCategory(filters?: ReportsFilters) {
  const { data } = await httpClient.get<ExpensesByCategoryReport>('/reports/expenses-by-category', {
    params: filters,
  });

  return data;
}
