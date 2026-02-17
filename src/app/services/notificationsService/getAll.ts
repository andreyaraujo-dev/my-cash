import { Notification } from '@/app/entities/Notification.ts';
import { httpClient } from '@/app/services/httpClient.ts';

export type NotificationsFilters = {
  page?: number;
  unreadOnly?: boolean;
};

export type NotificationsResponse = {
  data: Array<Notification>;
  meta: {
    page: number;
    totalPages: number;
    total: number;
  };
};

export async function getAll(filters: NotificationsFilters) {
  const { data } = await httpClient.get<NotificationsResponse>('/notifications', {
    params: filters,
  });

  return data;
}
