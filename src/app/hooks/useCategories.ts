import { useQuery } from '@tanstack/react-query';
import { categoriesService } from '@/app/services/categoriesService';

export function useCategories() {
  const { data, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  });

  return { categories: data ?? [], isFetching };
}

export function useCategoriesWithTransactions() {
  const { data, isFetching } = useQuery({
    queryKey: ['categoriesWithTransactions'],
    queryFn: categoriesService.getAllWithTransactions,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    categoriesWithTransactions: data ?? {
      summary: {
        totalCategories: 0,
        totalBudget: 0,
        totalSpending: 0,
      },
      categories: [],
    },
    isFetching,
  };
}
