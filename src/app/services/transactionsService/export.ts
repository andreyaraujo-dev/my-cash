import { httpClient } from '@/app/services/httpClient.ts';
import type { TransactionsFilters } from './getAll';

export async function exportTransactions(filters: TransactionsFilters): Promise<Blob> {
  const { data } = await httpClient.get<Blob>('/transactions/export', {
    responseType: 'blob',
    params: filters,
  });

  return data;
}
