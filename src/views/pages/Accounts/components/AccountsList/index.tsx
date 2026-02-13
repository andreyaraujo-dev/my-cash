import { BankAccount } from '@/app/entities/BankAccount';
import { AccountCard } from '@/views/pages/Dashboard/components/AccountCard';
import { useAccountsController } from '@/views/pages/Dashboard/components/Accounts/useAccountsController';
import { AccountsGridSkeleton } from './AccountsGridSkeleton';
import { Plus } from 'lucide-react';

interface AccountsListProps {
  accounts: BankAccount[];
  isLoading: boolean;
}

export function AccountsList({ accounts, isLoading }: AccountsListProps) {
  const { accountsTypeMapper, openNewAccountModal } = useAccountsController();

  if (isLoading) return <AccountsGridSkeleton />;

  return (
    <div className="space-y-4 mt-4">
      <h2 className="text-xl font-semibold">Todas as Contas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div key={account.id} className="space-y-2">
            <AccountCard data={account} />
            <p className="text-sm text-muted-foreground text-center">
              {accountsTypeMapper(account)}
            </p>
          </div>
        ))}

        {accounts.length === 0 && (
          <button
            type="button"
            onClick={openNewAccountModal}
            className="p-6 border-2 border-dashed border-muted-foreground/30 rounded-lg min-w-[200px] flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground transition-colors cursor-pointer min-h-[148px]"
          >
            <div className="w-10 h-10 rounded-full border-2 border-dashed border-current flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Cadastre uma nova conta</span>
          </button>
        )}
      </div>
    </div>
  );
}
