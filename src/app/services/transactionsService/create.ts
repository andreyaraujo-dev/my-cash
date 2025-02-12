import { httpClient } from '@/app/services/httpClient.ts';

export interface CreateTransactionParams {
  bankAccountId: string;
  categoryId: string;
  name: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  isPaid?: boolean;
}

export async function create(params: CreateTransactionParams) {
  const { data } = await httpClient.post('/transactions', params);

  return data;
}
