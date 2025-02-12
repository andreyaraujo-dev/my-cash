import { Transaction } from '@/app/entities/Transaction.ts';
import { httpClient } from '@/app/services/httpClient.ts';

type TransactionsResponse = Array<Transaction>;

export type TransactionsFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: Transaction['type'];
  isPaid?: boolean;
};

export async function getAll(filters: TransactionsFilters) {
  const { data } = await httpClient.get<TransactionsResponse>('/transactions', {
    params: filters,
  });

  return data;
}
