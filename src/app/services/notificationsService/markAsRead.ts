import { httpClient } from '@/app/services/httpClient.ts';

export async function markAsRead(id: string) {
  const { data } = await httpClient.patch(`/notifications/${id}/read`);

  return data;
}
