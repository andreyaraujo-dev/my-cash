import { useQuery } from '@tanstack/react-query';
import { transactionsService } from '@/app/services/transactionsService';
import type { SimulateParams } from '@/app/entities/Simulation';

export function useSimulate(params: SimulateParams | null) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['simulate', params],
    queryFn: () => transactionsService.simulate(params!),
    enabled: !!params,
  });

  return { data, isFetching, refetch };
}
