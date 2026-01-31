import { AverageBalanceReport } from '@/app/entities/Report';
import { httpClient } from '@/app/services/httpClient';

export async function getAverageBalance() {
  const { data } = await httpClient.get<AverageBalanceReport>('/reports/average-balance');

  return data;
}
