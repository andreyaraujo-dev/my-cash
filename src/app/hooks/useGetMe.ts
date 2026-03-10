import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/usersService';

export function useGetMe(signedIn: boolean) {
  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: usersService.me,
    enabled: signedIn,
    staleTime: Infinity,
  });
}
