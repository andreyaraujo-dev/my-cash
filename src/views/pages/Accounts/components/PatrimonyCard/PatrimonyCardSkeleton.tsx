import { Card } from '@/views/components/ui/card';
import { Skeleton } from '@/views/components/ui/skeleton';

export function PatrimonyCardSkeleton() {
  return (
    <Card className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 mt-4">
      <div className="text-center space-y-2">
        <Skeleton className="h-4 w-24 mx-auto" />
        <Skeleton className="h-8 w-32 mx-auto" />
        <Skeleton className="h-4 w-20 mx-auto" />
        <Skeleton className="h-3 w-28 mx-auto" />
      </div>
    </Card>
  );
}
