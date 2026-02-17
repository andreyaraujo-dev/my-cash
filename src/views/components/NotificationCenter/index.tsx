import { Bell, Check, CheckCheck, ChevronLeft, ChevronRight, InboxIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/views/components/ui/popover';
import { NotificationBadge } from '@/views/components/ui/notification-badge';
import { Button } from '@/views/components/ui/button';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/app/utils/formatRelativeTime';
import { Notification } from '@/app/entities/Notification';
import { useNotificationCenterController } from './useNotificationCenterController';

function NotificationItem({
  notification,
  onMarkAsRead,
}: {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 w-full text-left px-4 py-3 transition-colors',
        !notification.read && 'bg-accent/30',
      )}
    >
      <div className="mt-1.5 shrink-0">
        <div
          className={cn(
            'h-2 w-2 rounded-full',
            notification.read ? 'bg-transparent' : 'bg-blue-500',
          )}
        />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <p
          className={cn(
            'text-sm leading-tight truncate',
            notification.read ? 'text-muted-foreground' : 'font-medium text-foreground',
          )}
        >
          {notification.title}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] text-muted-foreground/70">
            {formatRelativeTime(notification.createdAt)}
          </p>
          {!notification.read && (
            <button
              type="button"
              className="flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
              onClick={() => onMarkAsRead(notification.id)}
            >
              <Check className="h-3 w-3" />
              Marcar como lida
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
      <InboxIcon className="h-10 w-10 mb-2 opacity-40" />
      <p className="text-sm">Nenhuma notificação</p>
    </div>
  );
}

export function NotificationCenter() {
  const {
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
    isMarkingAllAsRead,
    handlePreviousPage,
    handleNextPage,
    handleToggleUnreadOnly,
  } = useNotificationCenterController();

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative flex items-center justify-center h-8 w-8 rounded-full border border-border bg-muted outline-none hover:bg-accent transition-colors"
        >
          <NotificationBadge label={unreadCount > 0 ? unreadCount : undefined}>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </NotificationBadge>
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-[380px] p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold text-sm">Notificações</h3>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs w-auto text-muted-foreground"
                onClick={handleMarkAllAsRead}
                disabled={isMarkingAllAsRead}
              >
                <CheckCheck className="h-3.5 w-3.5 mr-1" />
                Marcar todas como lidas
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center px-4 py-2 border-b">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={handleToggleUnreadOnly}
              className="h-3.5 w-3.5 rounded border-border accent-blue-500"
            />
            <span className="text-xs text-muted-foreground">Apenas não lidas</span>
          </label>
        </div>

        <div className="max-h-[340px] overflow-y-auto">
          {isLoading && notifications.length === 0 ? (
            <div className="flex items-center justify-center py-10">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
            </div>
          ) : notifications.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </div>
          )}
        </div>

        {meta.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-2 border-t">
            <span className="text-xs text-muted-foreground">
              Página {page} de {meta.totalPages}
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={handlePreviousPage}
                disabled={page <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={handleNextPage}
                disabled={page >= meta.totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
