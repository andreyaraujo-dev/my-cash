import { getAll } from './getAll';
import { getUnreadCount } from './getUnreadCount';
import { markAsRead } from './markAsRead';
import { markAllAsRead } from './markAllAsRead';

export const notificationsService = {
  getAll,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};
