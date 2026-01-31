import { Card } from '@/views/components/ui/card';
import { Skeleton } from '@/views/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  isLoading?: boolean;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  colorClass,
  isLoading = false,
}: MetricCardProps) {
  return (
    <Card className={cn('p-6', colorClass)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      ) : (
        <>
          <div className="text-2xl font-bold mb-1">{value}</div>
          <p className="text-sm opacity-80">{subtitle}</p>
        </>
      )}
    </Card>
  );
}
