import { PlusIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu.tsx';
import { CategoryIcon } from '@/views/components/icons/Categories/CategoryIcon.tsx';
import { useDashboard } from '@/app/hooks/useDashboard.ts';
import { useState } from 'react';
import { cn } from '@/lib/utils.ts';

export function Fab() {
  const { openNewTransactionModal } = useDashboard();
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
          'rounded-md text-zinc-800 bg-white w-full h-12 flex items-center justify-center transition-all outline-none',
        )}
      >
        <PlusIcon className="w-6 h-6" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="font-normal text-sm border" align="end">
        <DropdownMenuItem onSelect={() => handleOpenModal('EXPENSE')}>
          <span className="flex items-center justify-center gap-2">
            <CategoryIcon type="EXPENSE" />
          </span>
          Nova Despesa
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleOpenModal('INCOME')}>
          <span className="flex items-center justify-center gap-2">
            <CategoryIcon type="INCOME" />
            Nova Receita
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
