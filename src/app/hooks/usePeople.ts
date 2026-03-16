import { useQuery } from '@tanstack/react-query';
import { peopleService } from '@/app/services/peopleService';

export function usePeople() {
  const { data, isFetching } = useQuery({
    queryKey: ['people'],
    queryFn: peopleService.getAll,
  });

  return { people: data ?? [], isFetching };
}

export function usePeopleAccessHistory(enabled = true) {
  const { data, isFetching } = useQuery({
    queryKey: ['people', 'accessHistory'],
    queryFn: peopleService.getAccessHistory,
    enabled,
  });

  return { accessHistory: data ?? [], isFetching };
}
