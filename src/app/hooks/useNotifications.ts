import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsService } from '@/app/services/notificationsService';
import {
  NotificationsFilters,
  NotificationsResponse,
} from '@/app/services/notificationsService/getAll.ts';

export function useNotifications(filters: NotificationsFilters) {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['notifications', filters],
    queryFn: () => notificationsService.getAll(filters),
  });

  return {
    notifications: data?.data ?? [],
    meta: data?.meta ?? { page: 1, totalPages: 1, total: 0 },
    isLoading: isFetching ?? isLoading,
  };
}

export function useUnreadNotificationsCount() {
  const { data } = useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: notificationsService.getUnreadCount,
    refetchInterval: 60_000,
  });

  return {
    unreadCount: data ?? 0,
  };
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsService.markAsRead,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      const queriesData = queryClient.getQueriesData<NotificationsResponse>({
        queryKey: ['notifications'],
        exact: false,
      });

      const previousData = queriesData.map(([key, data]) => ({ key, data }));

      queryClient.setQueriesData<NotificationsResponse>(
        { queryKey: ['notifications'], exact: false },
        (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((n) =>
              n.id === notificationId ? { ...n, read: true, readAt: new Date().toISOString() } : n,
            ),
          };
        },
      );

      const previousCount = queryClient.getQueryData<number>(['notifications', 'unread-count']);
      queryClient.setQueryData<number>(['notifications', 'unread-count'], (old) =>
        old && old > 0 ? old - 1 : 0,
      );

      return { previousData, previousCount };
    },
    onError: (_err, _id, context) => {
      context?.previousData.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });
      queryClient.setQueryData(['notifications', 'unread-count'], context?.previousCount);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'], exact: false });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationsService.markAllAsRead,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['notifications'] });

      const queriesData = queryClient.getQueriesData<NotificationsResponse>({
        queryKey: ['notifications'],
        exact: false,
      });

      const previousData = queriesData.map(([key, data]) => ({ key, data }));

      const now = new Date().toISOString();
      queryClient.setQueriesData<NotificationsResponse>(
        { queryKey: ['notifications'], exact: false },
        (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((n) => ({ ...n, read: true, readAt: now })),
          };
        },
      );

      const previousCount = queryClient.getQueryData<number>(['notifications', 'unread-count']);
      queryClient.setQueryData<number>(['notifications', 'unread-count'], 0);

      return { previousData, previousCount };
    },
    onError: (_err, _vars, context) => {
      context?.previousData.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });
      queryClient.setQueryData(['notifications', 'unread-count'], context?.previousCount);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'], exact: false });
    },
  });
}
