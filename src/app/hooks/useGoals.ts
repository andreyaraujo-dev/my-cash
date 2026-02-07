import { useQuery } from '@tanstack/react-query';
import { goalsService } from '../services/goalsService';
import { GoalsFilters } from '../services/goalsService/getAll';

export function useGoals(filters: GoalsFilters) {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['goals', filters],
    queryFn: () => goalsService.getAll(filters),
  });

  return {
    goals: data ?? [],
    isFetching,
    isLoading,
    refetch,
  };
}
