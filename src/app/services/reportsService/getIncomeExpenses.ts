import { IncomeExpensesReport, ReportsFilters } from '@/app/entities/Report';
import { httpClient } from '@/app/services/httpClient';

export async function getIncomeExpenses(filters?: ReportsFilters) {
  const { data } = await httpClient.get<IncomeExpensesReport>('/reports/income-expenses', {
    params: filters,
  });

  return data;
}
