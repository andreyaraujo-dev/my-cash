import { useQuery } from '@tanstack/react-query';
import { peopleService } from '@/app/services/peopleService';

export function usePeople() {
  const { data, isFetching } = useQuery({
    queryKey: ['people'],
    queryFn: peopleService.getAll,
  });

  return { people: data ?? [], isFetching };
}

export function usePeopleAccessHistory(enabled = true, personId?: string) {
  const { data, isFetching } = useQuery({
    queryKey: ['people', 'accessHistory'],
    queryFn: peopleService.getAccessHistory,
    enabled,
  });

  const accessHistory = (data ?? []).filter((log) => !personId || log.sharedPersonId === personId);

  return { accessHistory, isFetching };
}
