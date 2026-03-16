import { AccessLog } from '@/app/entities/Person';
import { httpClient } from '@/app/services/httpClient';

export async function getAccessHistory(): Promise<AccessLog[]> {
  const { data } = await httpClient.get<AccessLog[]>('/people/access-history');
  return data;
}
