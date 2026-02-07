import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '@/app/services/transactionsService';
import { TransactionsFilters } from '@/app/services/transactionsService/getAll.ts';

export function useTransactions(filters: TransactionsFilters) {
  const { data, isFetching, isInitialLoading, refetch, isLoading } = useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => transactionsService.getAll(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching ?? isLoading,
    isInitialLoading,
    refetchTransactions: refetch,
  };
}
