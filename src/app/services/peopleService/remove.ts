import { httpClient } from '@/app/services/httpClient';

export async function remove(personId: string): Promise<void> {
  await httpClient.delete(`/people/${personId}`);
}
