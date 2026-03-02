import { BankAccountType } from '@/views/components/icons/BankAccountType';
import { AccountStatsSkeleton } from './AccountStatsSkeleton';

interface AccountsStatsProps {
  isLoading: boolean;
  totalCheckingAccount: number;
  totalSavingAccount: number;
  totalInvestmentAccount: number;
}

export function AccountsStats({
  isLoading,
  totalCheckingAccount,
  totalInvestmentAccount,
  totalSavingAccount,
}: AccountsStatsProps) {
  if (isLoading) return <AccountStatsSkeleton />;

  return (
    <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-3 items-center justify-between mt-4">
      <div className="border border-border rounded-md p-4 flex gap-2 flex-1">
        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
          <BankAccountType type="CHECKING" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground tracking-[-0.5px] block">Conta Corrente</p>
          <p className="font-semibold">
            {totalCheckingAccount <= 0 ? 'Nenhuma' : totalCheckingAccount}
            {totalCheckingAccount <= 1 ? ' conta' : ' contas'}
          </p>
        </div>
      </div>

      <div className="border border-border rounded-md p-4 flex gap-2 flex-1">
        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
          <BankAccountType type="SAVING" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground tracking-[-0.5px] block">Conta Poupança</p>
          <p className="font-semibold">
            {totalSavingAccount <= 0 ? 'Nenhuma' : totalSavingAccount}
            {totalSavingAccount <= 1 ? ' conta' : ' contas'}
          </p>
        </div>
      </div>

      <div className="border border-border rounded-md p-4 flex gap-2 flex-1">
        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
          <BankAccountType type="INVESTMENT" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground tracking-[-0.5px] block">
            Conta de Investimento
          </p>
          <p className="font-semibold">
            {totalInvestmentAccount <= 0 ? 'Nenhuma' : totalInvestmentAccount}
            {totalInvestmentAccount <= 1 ? ' conta' : ' contas'}
          </p>
        </div>
      </div>
    </div>
  );
}
