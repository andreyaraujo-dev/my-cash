import { httpClient } from '@/app/services/httpClient.ts';

export async function markAllAsRead() {
  const { data } = await httpClient.patch('/notifications/read-all');

  return data;
}
