import { PlusIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/views/components/ui/dropdown-menu.tsx';
import { CategoryIcon } from '@/views/components/icons/Categories/CategoryIcon.tsx';
import { BankAccountIcon } from '@/views/components/icons/BankAccountIcon.tsx';
import { useDashboard } from '@/app/hooks/useDashboard.ts';
import { useState } from 'react';
import { cn } from '@/lib/utils.ts';

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          'fixed z-[999] bottom-4 right-4 rounded-full text-zinc-800 bg-white w-12 h-12 flex items-center justify-center transition-all outline-none',
          open && 'rotate-45',
        )}
      >
        <PlusIcon className="w-6 h-6" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="font-normal text-sm border" align="end">
        <DropdownMenuItem onSelect={() => openNewTransactionModal('EXPENSE')}>
          <span className="flex items-center justify-center gap-2">
            <CategoryIcon type="EXPENSE" />
          </span>
          Nova Despesa
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => openNewTransactionModal('INCOME')}>
          <span className="flex items-center justify-center gap-2">
            <CategoryIcon type="INCOME" />
            Nova Receita
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={openNewAccountModal}>
          <span className="flex items-center justify-center gap-2">
            <BankAccountIcon />
            Nova Conta
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
