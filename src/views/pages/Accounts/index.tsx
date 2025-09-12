import { Button } from '@/views/components/ui/button';
import { Plus } from 'lucide-react';
import { useAccountsController } from '../Dashboard/components/Accounts/useAccountsController';
import { BankAccountType } from '@/app/entities/BankAccount';
import { useMemo } from 'react';
import { useTransactions } from '@/app/hooks/useTransactions';
import { PatrimonyCard } from './components/PatrimonyCard';
import { AccountsList } from './components/AccountsList';
import { AccountsStats } from './components/AccountsStats';

export function AccountsPage() {
  const { accounts, isLoading: isLoadingAccounts } = useAccountsController();
  const totalCheckingAccount = accounts.filter(
    (account) => account.type === BankAccountType.checking,
  ).length;
  const totalSavingAccount = accounts.filter(
    (account) => account.type === BankAccountType.saving,
  ).length;
  const totalInvestmentAccount = accounts.filter(
    (account) => account.type === BankAccountType.investment,
  ).length;

  const totalPatrimony = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0);
  }, [accounts]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const { transactions: currentMonthTransactions, isLoading: isLoadingCurrentMonth } =
    useTransactions({
      month: currentMonth,
      year: currentYear,
      // isPaid: true,
    });

  const { transactions: previousMonthTransactions, isLoading: isLoadingPreviousMonth } =
    useTransactions({
      month: previousMonth,
      year: previousYear,
      // isPaid: true,
    });

  const monthlyVariation = useMemo(() => {
    const previousMonthIncome = previousMonthTransactions
      .filter((transaction) => transaction.type === 'INCOME')
      .reduce((total, transaction) => total + transaction.value, 0);

    const previousMonthExpenses = previousMonthTransactions
      .filter((transaction) => transaction.type === 'EXPENSE')
      .reduce((total, transaction) => total + transaction.value, 0);

    const previousMonthBalance = previousMonthIncome - previousMonthExpenses;

    const currentMonthIncome = currentMonthTransactions
      .filter((transaction) => transaction.type === 'INCOME')
      .reduce((total, transaction) => total + transaction.value, 0);

    const currentMonthExpenses = currentMonthTransactions
      .filter((transaction) => transaction.type === 'EXPENSE')
      .reduce((total, transaction) => total + transaction.value, 0);

    const currentMonthBalance = currentMonthIncome - currentMonthExpenses;

    const variation = currentMonthBalance - previousMonthBalance;

    const percentage =
      previousMonthBalance !== 0 ? (variation / Math.abs(previousMonthBalance)) * 100 : 0;

    return {
      value: variation,
      percentage: Math.abs(percentage),
      isPositive: variation >= 0,
      previousBalance: previousMonthBalance,
      currentBalance: currentMonthBalance,
      previousIncome: previousMonthIncome,
      previousExpenses: previousMonthExpenses,
      currentIncome: currentMonthIncome,
      currentExpenses: currentMonthExpenses,
    };
  }, [currentMonthTransactions, previousMonthTransactions]);

  const isLoadingCalculations = isLoadingCurrentMonth || isLoadingPreviousMonth;

  return (
    <div className="flex flex-col justify-between gap-4 h-full">
      <div>
        <div className="w-full flex justify-end">
          <Button className="w-max text-base ">
            <Plus />
            Nova Conta
          </Button>
        </div>

        <AccountsStats
          isLoading={isLoadingAccounts}
          totalCheckingAccount={totalCheckingAccount}
          totalInvestmentAccount={totalInvestmentAccount}
          totalSavingAccount={totalSavingAccount}
        />

        <AccountsList accounts={accounts} isLoading={isLoadingAccounts} />
      </div>

      <PatrimonyCard
        isLoading={isLoadingCalculations}
        percentage={monthlyVariation.percentage}
        isPositive={monthlyVariation.isPositive}
        totalPatrimony={totalPatrimony}
        value={monthlyVariation.value}
      />
    </div>
  );
}
