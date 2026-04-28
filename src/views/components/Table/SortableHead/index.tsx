import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { TableHead } from '@/views/components/ui/table';
import { cn } from '@/lib/utils';

export type SortDir = 'asc' | 'desc';

export interface SortableHeadProps {
  label: string;
  className?: string;
  isSortable?: boolean;
  sortKey?: string;
  active?: string | null;
  direction?: SortDir;
  // eslint-disable-next-line no-unused-vars
  onSort?: (key: string) => void;
}

export function SortableHead({
  label,
  className,
  isSortable = false,
  sortKey,
  active,
  direction = 'asc',
  onSort,
}: SortableHeadProps) {
  if (!isSortable) {
    return <TableHead className={className}>{label}</TableHead>;
  }

  const isActive = active === sortKey;
  const Icon = isActive ? (direction === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown;

  return (
    <TableHead className={className}>
      <button
        type="button"
        onClick={() => sortKey && onSort?.(sortKey)}
        className="flex items-center gap-1 hover:text-foreground transition-colors select-none"
      >
        {label}
        <Icon size={13} className={cn('shrink-0', isActive ? 'opacity-100' : 'opacity-40')} />
      </button>
    </TableHead>
  );
}
