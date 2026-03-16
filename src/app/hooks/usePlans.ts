import { useQuery } from '@tanstack/react-query';
import { plansService } from '@/app/services/plansService';

export function usePlans() {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: () => plansService.getAll(),
  });

  const activePlans = data?.filter((plan) => plan.isActive) ?? [];

  return {
    plans: activePlans,
    allPlans: data ?? [],
    isFetching,
    isLoading,
  };
}
