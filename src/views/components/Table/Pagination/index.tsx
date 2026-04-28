import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/views/components/ui/pagination';
import { cn } from '@/lib/utils';

interface TablePaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (_page: number) => void;
  itemLabel?: { singular: string; plural: string };
}

export function TablePagination({
  page,
  totalPages,
  totalItems,
  onPageChange,
  itemLabel = { singular: 'item', plural: 'itens' },
}: TablePaginationProps) {
  function getPageNumbers(): (number | 'ellipsis')[] {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | 'ellipsis')[] = [1];
    if (page > 3) pages.push('ellipsis');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
    return pages;
  }

  const label = totalItems === 1 ? itemLabel.singular : itemLabel.plural;

  return (
    <div className="flex items-center justify-between pt-2 w-full">
      <div>
        <p className="text-sm text-muted-foreground">
          Página {page} de {totalPages} &mdash; {totalItems} {label}
        </p>
      </div>

      <Pagination className="w-auto mx-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(1, page - 1))}
              className={cn('cursor-pointer', page === 1 && 'pointer-events-none opacity-50')}
            />
          </PaginationItem>

          {getPageNumbers().map((pg, idx) =>
            pg === 'ellipsis' ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={pg}>
                <PaginationLink
                  isActive={pg === page}
                  onClick={() => onPageChange(pg)}
                  className="cursor-pointer"
                >
                  {pg}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(totalPages, page + 1))}
              className={cn(
                'cursor-pointer',
                page === totalPages && 'pointer-events-none opacity-50',
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
