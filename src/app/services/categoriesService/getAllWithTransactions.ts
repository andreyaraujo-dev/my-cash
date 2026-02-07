import { Category } from '@/app/entities/Category';
import { httpClient } from '../httpClient';

type CategoriesResponse = {
  summary: {
    totalCategories: number;
    totalBudget: number;
    totalSpending: number;
  };
  categories: Array<
    Category & {
      transactionCount: number;
      spending: number;
      budget: number;
      percentageUsed: number;
      status: 'normal' | 'attention' | 'critical';
      remaining: number;
    }
  >;
};

export async function getAllWithTransactions() {
  const { data } = await httpClient.get<CategoriesResponse>('/categories/with-transactions');

  return data;
}
