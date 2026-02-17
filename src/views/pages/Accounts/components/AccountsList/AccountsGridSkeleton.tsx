import { Skeleton } from '@/views/components/ui/skeleton';

export function AccountsGridSkeleton() {
  return (
    <div className="space-y-4 mt-4">
      <Skeleton className="h-6 w-32" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
