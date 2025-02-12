/* eslint-disable no-unused-vars */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu';
import { TransactionsIcon } from '@/views/components/icons/TransactionsIcon';
import { ChevronDownIcon } from 'lucide-react';
import { ExpensesIcon } from '@/views/components/icons/ExpensesIcon';
import { IncomeIcon } from '@/views/components/icons/IncomeIcon';
import { useState } from 'react';
import { cn } from '@/lib/utils.ts';

interface TransactionTypeDropdownProps {
  onSelect(type: 'INCOME' | 'EXPENSE' | undefined): void;
  selectedType: 'INCOME' | 'EXPENSE' | undefined;
}

export function TransactionTypeDropdown({ onSelect, selectedType }: TransactionTypeDropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
        {selectedType === 'EXPENSE' && <ExpensesIcon />}
        {selectedType === 'INCOME' && <IncomeIcon />}
        {selectedType === undefined && <TransactionsIcon />}

        <span className="text-sm text-zinc-100 tracking-[-0.5px] font-medium">
          {selectedType === 'EXPENSE' && 'Despesas'}
          {selectedType === 'INCOME' && 'Receitas'}
          {selectedType === undefined && 'Transações'}
        </span>
        <ChevronDownIcon
          className={cn('text-zinc-100 transition-all h-4 w-4', open && 'rotate-180')}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[279px] p-2 border-zinc-800 space-y-2" align="start">
        <DropdownMenuItem onSelect={() => onSelect('INCOME')}>
          <IncomeIcon />
          Receitas
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onSelect('EXPENSE')}>
          <ExpensesIcon />
          Despesas
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onSelect(undefined)}>
          <TransactionsIcon />
          Transações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
