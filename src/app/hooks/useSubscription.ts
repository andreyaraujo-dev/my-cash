import { useQuery } from '@tanstack/react-query';
import { subscriptionsService } from '../services/subscriptionsService';

export function useSubscription() {
  const { data, isFetching, isLoading, refetch } = useQuery({
    queryKey: ['subscription'],
    queryFn: () => subscriptionsService.getSubscription(),
  });

  return {
    subscription: data ?? null,
    isFetching,
    isLoading,
    refetch,
  };
}
