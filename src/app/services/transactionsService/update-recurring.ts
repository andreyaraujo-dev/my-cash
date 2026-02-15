import { httpClient } from '../httpClient';

export interface UpdateRecurringTransactionParams {
  id: string;
  scope: 'single' | 'future';
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  isPaid?: boolean;
}

export async function updateRecurring({ id, scope, ...params }: UpdateRecurringTransactionParams) {
  const { data } = await httpClient.put(`/transactions/recurring/${id}`, params, {
    params: { scope },
  });

  return data;
}
