import { useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { CircleCheck, CircleDashed, MoreHorizontal, Pencil, Repeat } from 'lucide-react';

import { Transaction } from '@/app/entities/Transaction';
import { formatCurrency } from '@/app/utils/formatCurrency';

import { Badge } from '@/views/components/ui/badge';
import { Button } from '@/views/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu';
import { TablePagination } from '@/views/components/Table/Pagination';
import { SortableHead } from '@/views/components/Table/SortableHead';
import type { SortDir } from '@/views/components/Table/SortableHead';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/views/components/ui/table';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 10;

type SortKey = 'date' | 'name' | 'category' | 'account' | 'type' | 'value' | 'status';

export interface TransactionsTableProps {
  transactions: Transaction[];
  accountMap: Record<string, string>;
  categoryMap: Record<string, string>;
  sortable?: boolean;
  canEdit?: boolean;
  areValuesVisible?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleOpenEditModal: (transaction: Transaction) => void;
  // eslint-disable-next-line no-unused-vars
  handleTogglePaid: (id: string) => void;
}

export function TransactionsTable({
  transactions,
  accountMap,
  categoryMap,
  sortable = false,
  canEdit = true,
  areValuesVisible = true,
  handleOpenEditModal,
  handleTogglePaid,
}: TransactionsTableProps) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function handleSort(key: string) {
    const typed = key as SortKey;
    if (sortKey === typed) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(typed);
      setSortDir('asc');
    }
    setPage(1);
  }

  const sortedTransactions = useMemo(() => {
    if (!sortable || sortKey === null) return transactions;
    return [...transactions].sort((a, b) => {
      let valA: string | number | boolean = '';
      let valB: string | number | boolean = '';
      switch (sortKey) {
        case 'date':
          valA = a.date;
          valB = b.date;
          break;
        case 'name':
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
          break;
        case 'category':
          valA = (categoryMap[a.categoryId] ?? a.category?.name ?? '').toLowerCase();
          valB = (categoryMap[b.categoryId] ?? b.category?.name ?? '').toLowerCase();
          break;
        case 'account':
          valA = (accountMap[a.bankAccountId] ?? '').toLowerCase();
          valB = (accountMap[b.bankAccountId] ?? '').toLowerCase();
          break;
        case 'type':
          valA = a.type;
          valB = b.type;
          break;
        case 'value':
          valA = a.value;
          valB = b.value;
          break;
        case 'status':
          valA = a.isPaid ? 1 : 0;
          valB = b.isPaid ? 1 : 0;
          break;
      }
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [transactions, sortable, sortKey, sortDir, accountMap, categoryMap]);

  const totalPages = Math.max(1, Math.ceil(sortedTransactions.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginatedTransactions = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return sortedTransactions.slice(start, start + PAGE_SIZE);
  }, [sortedTransactions, safePage]);

  useEffect(() => {
    setPage(1);
  }, [transactions]);

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">Nenhuma transação encontrada</div>
    );
  }

  return (
    <>
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHead
                label="Data"
                className="w-[100px]"
                isSortable={sortable}
                sortKey="date"
                active={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <SortableHead
                label="Descrição"
                isSortable={sortable}
                sortKey="name"
                active={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <SortableHead
                label="Categoria"
                className="hidden md:table-cell"
                isSortable={sortable}
                sortKey="category"
                active={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <SortableHead
                label="Conta"
                className="hidden lg:table-cell"
                isSortable={sortable}
                sortKey="account"
                active={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <SortableHead
                label="Tipo"
                className="hidden sm:table-cell"
                isSortable={sortable}
                sortKey="type"
                active={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <SortableHead
                label="Valor"
                className="text-right"
                isSortable={sortable}
                sortKey="value"
                active={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              <SortableHead
                label="Status"
                className="hidden sm:table-cell text-center w-[100px]"
                isSortable={sortable}
                sortKey="status"
                active={sortKey}
                direction={sortDir}
                onSort={handleSort}
              />
              {canEdit && <TableHead className="w-[48px]" />}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedTransactions.map((transaction) => {
              const {
                id,
                type,
                date,
                name,
                value,
                isPaid,
                recurrenceGroupId,
                category,
                categoryId,
                bankAccountId,
              } = transaction;
              const isIncome = type === 'INCOME';
              const amountColor = isIncome ? 'text-green-500' : 'text-red-500';
              const prefix = isIncome ? '+' : '-';

              return (
                <TableRow key={id} className={cn(isPaid && 'opacity-60')}>
                  <TableCell className="text-muted-foreground text-xs whitespace-nowrap">
                    {format(date, 'dd/MM/yyyy')}
                  </TableCell>

                  <TableCell>
                    <span className="flex items-center gap-1.5 font-medium">
                      {name}
                      {recurrenceGroupId && (
                        <Repeat size={13} className="text-muted-foreground shrink-0" />
                      )}
                    </span>
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {categoryMap[categoryId] ?? category?.name ?? '—'}
                  </TableCell>

                  <TableCell className="hidden lg:table-cell text-muted-foreground text-sm">
                    {accountMap[bankAccountId] ?? '—'}
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs',
                        isIncome
                          ? 'border-green-500/40 text-green-600'
                          : 'border-red-500/40 text-red-600',
                      )}
                    >
                      {isIncome ? 'Receita' : 'Despesa'}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <span
                      className={cn(
                        'font-semibold tabular-nums',
                        amountColor,
                        !areValuesVisible && 'blur-md select-none',
                      )}
                    >
                      {prefix} {formatCurrency(value)}
                    </span>
                  </TableCell>

                  <TableCell className="hidden sm:table-cell text-center">
                    {isPaid ? (
                      <Badge
                        variant="outline"
                        className="text-xs gap-1 border-green-500/40 text-green-600"
                      >
                        <CircleCheck size={11} />
                        {isIncome ? 'Recebido' : 'Pago'}
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs gap-1',
                          isIncome
                            ? 'border-blue-500/40 text-blue-600'
                            : 'border-yellow-500/40 text-yellow-600',
                        )}
                      >
                        <CircleDashed size={11} />
                        {isIncome ? 'A receber' : 'Pendente'}
                      </Badge>
                    )}
                  </TableCell>

                  {canEdit && (
                    <TableCell>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal size={16} />
                            <span className="sr-only">Ações</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleOpenEditModal(transaction)}>
                            <Pencil size={14} className="mr-2" />
                            Editar
                          </DropdownMenuItem>
                          {type === 'EXPENSE' && (
                            <DropdownMenuItem onClick={() => handleTogglePaid(id)}>
                              {isPaid ? (
                                <CircleDashed size={14} className="mr-2" />
                              ) : (
                                <CircleCheck size={14} className="mr-2" />
                              )}
                              {isPaid ? 'Marcar como pendente' : 'Marcar como pago'}
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <TablePagination
          page={safePage}
          totalPages={totalPages}
          totalItems={transactions.length}
          onPageChange={setPage}
          itemLabel={{ singular: 'transação', plural: 'transações' }}
        />
      )}
    </>
  );
}
