import { PlusIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu.tsx';
import { CategoryIcon } from '@/views/components/icons/Categories/CategoryIcon.tsx';
import { useTransactionsContext } from '@/app/hooks/useTransactionsContext';
import { useState } from 'react';
import { cn } from '@/lib/utils.ts';

interface TransactionsFabProps {
  className?: string;
  buttonText?: string;
}

export function TransactionsFab({ className, buttonText }: TransactionsFabProps) {
  const { openNewTransactionModal } = useTransactionsContext();
  const [open, setOpen] = useState(false);

  const handleOpenModal = (type: 'INCOME' | 'EXPENSE') => {
    setOpen(false);
    setTimeout(() => {
      openNewTransactionModal(type);
    }, 0);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          'rounded-md text-primary-foreground bg-primary w-full h-12 flex items-center justify-center transition-all outline-none',
          className,
        )}
      >
        <PlusIcon className="w-5 h-5" />
        {buttonText && <span className="font-medium">{buttonText}</span>}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="font-normal text-sm border" align="end">
        <DropdownMenuItem onSelect={() => handleOpenModal('EXPENSE')}>
          <span className="flex items-center justify-center gap-2">
            <CategoryIcon type="EXPENSE" className="h-8 w-8" />
          </span>
          Nova Despesa
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleOpenModal('INCOME')}>
          <span className="flex items-center justify-center gap-2">
            <CategoryIcon type="INCOME" className="h-8 w-8" />
            Nova Receita
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
