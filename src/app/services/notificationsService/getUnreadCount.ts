import { httpClient } from '@/app/services/httpClient.ts';

type UnreadCountResponse = {
  count: number;
};

export async function getUnreadCount() {
  const { data } = await httpClient.get<UnreadCountResponse>('/notifications/unread-count');

  return data.count;
}
