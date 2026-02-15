import { httpClient } from '../httpClient';

export async function removeRecurring(transactionId: string, scope: 'single' | 'future') {
  const { data } = await httpClient.delete(`/transactions/recurring/${transactionId}`, {
    params: { scope },
  });

  return data;
}
