import { BankAccount } from '@/app/entities/BankAccount';
import { AccountCard } from '@/views/pages/Dashboard/components/AccountCard';
import { useAccountsController } from '@/views/pages/Dashboard/components/Accounts/useAccountsController';
import { AccountsGridSkeleton } from './AccountsGridSkeleton';

interface AccountsListProps {
  accounts: BankAccount[];
  isLoading: boolean;
}

export function AccountsList({ accounts, isLoading }: AccountsListProps) {
  const { accountsTypeMapper } = useAccountsController();

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
      </div>
    </div>
  );
}
