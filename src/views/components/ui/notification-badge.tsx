import { Badge, BadgeProps } from './badge';
import { cn } from '@/lib/utils';

export interface NotificationBadgeProps extends BadgeProps {
  label?: string | number;
  show?: boolean;
}

export const NotificationBadge = ({
  label,
  className,
  show,
  children,
  ...props
}: NotificationBadgeProps) => {
  const showBadge = typeof label !== 'undefined' && (typeof show === 'undefined' || show);
  return (
    <div className="inline-flex relative">
      {children}
      {showBadge && (
        <Badge
          className={cn(
            'absolute top-0 right-0 rounded-full text-[8px] p-1 h-4 w-4 flex items-center justify-center hover:bg-blue-800 bg-blue-900',
            typeof label !== 'undefined' && ('' + label).length === 0
              ? 'translate-x-1 -translate-y-1'
              : 'translate-x-1.5 -translate-y-1.5',
            className,
          )}
          {...props}
        >
          {'' + label}
        </Badge>
      )}
    </div>
  );
};
