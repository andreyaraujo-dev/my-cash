import { useState, useCallback } from 'react';
import {
  useNotifications,
  useUnreadNotificationsCount,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from '@/app/hooks/useNotifications';

export function useNotificationCenterController() {
  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { notifications, meta, isLoading } = useNotifications({
    page,
    unreadOnly: unreadOnly || undefined,
  });

  const { unreadCount } = useUnreadNotificationsCount();

  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  const handleMarkAsRead = useCallback(
    (id: string) => {
      markAsReadMutation.mutate(id);
    },
    [markAsReadMutation],
  );

  const handleMarkAllAsRead = useCallback(() => {
    markAllAsReadMutation.mutate();
  }, [markAllAsReadMutation]);

  const handlePreviousPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((prev) => Math.min(meta.totalPages, prev + 1));
  }, [meta.totalPages]);

  const handleToggleUnreadOnly = useCallback(() => {
    setUnreadOnly((prev) => !prev);
    setPage(1);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (open) {
      setPage(1);
    }
  }, []);

  return {
    isOpen,
    handleOpenChange,
    notifications,
    meta,
    isLoading,
    unreadCount,
    unreadOnly,
    page,
    handleMarkAsRead,
    handleMarkAllAsRead,
    isMarkingAllAsRead: markAllAsReadMutation.isPending,
    handlePreviousPage,
    handleNextPage,
    handleToggleUnreadOnly,
  };
}
