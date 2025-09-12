import { Skeleton } from '@/views/components/ui/skeleton';

export function AccountStatsSkeleton() {
  return (
    <div className="w-full grid grid-cols-3 gap-3 items-center justify-between mt-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-zinc-800 rounded-md p-4 flex gap-2 flex-1">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-5 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
