import { useQuery } from '@tanstack/react-query';
import { goalsService } from '../services/goalsService';

export function useGoalOperations(goalId: string | null) {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['goal-operations', goalId],
    queryFn: () => goalsService.getOperations(goalId!),
    enabled: !!goalId,
  });

  return {
    operations: data ?? [],
    isFetching,
    isLoading,
    refetch,
  };
}
