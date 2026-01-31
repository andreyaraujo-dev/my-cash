import { SavingsRateReport, ReportsFilters } from '@/app/entities/Report';
import { httpClient } from '@/app/services/httpClient';

export async function getSavingsRate(filters?: ReportsFilters) {
  const { data } = await httpClient.get<SavingsRateReport>('/reports/savings-rate', {
    params: filters,
  });

  return data;
}
