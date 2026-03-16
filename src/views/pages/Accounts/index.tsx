import { Button } from '@/views/components/ui/button';
import { Plus } from 'lucide-react';
import { useAccountsController } from '../Dashboard/components/Accounts/useAccountsController';
import { useSharedAccessLevel } from '@/app/hooks/useSharedAccessLevel';
import { BankAccountType } from '@/app/entities/BankAccount';
import { useMemo } from 'react';
import { useTransactions } from '@/app/hooks/useTransactions';
import { PatrimonyCard } from './components/PatrimonyCard';
import { AccountsList } from './components/AccountsList';
import { AccountsStats } from './components/AccountsStats';
import { NewAccountModal } from '../Dashboard/components/Modals/NewAccountModal';
import { DashboardProvider } from '@/app/context/DashboardContext';
import { EditAccountModal } from '../Dashboard/components/Modals/EditAccountModal';
import { Skeleton } from '@/views/components/ui/skeleton';
import { PageTour } from '@/views/components/Tour/PageTour';
import { accountsTourSteps, TOUR_IDS } from '@/views/components/Tour/tours';

export function AccountsPage() {
  return (
    <DashboardProvider>
      <AccountsPageWithAccess />
    </DashboardProvider>
  );
}

function AccountsPageWithAccess() {
  const { canCreate, canEdit } = useSharedAccessLevel();
  return (
    <>
      <AccountsPageContent />
      {canEdit && <EditAccountModal />}
      {canCreate && <NewAccountModal />}
    </>
  );
}

export function AccountsPageContent() {
  const { accounts, isLoading: isLoadingAccounts, openNewAccountModal } = useAccountsController();
  const { canCreate, canEdit } = useSharedAccessLevel();
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
        {canCreate && (
          <div className="w-full flex justify-end" data-tour="new-account-btn">
            {isLoadingAccounts ? (
              <Skeleton className="w-32 h-10 rounded-md" />
            ) : (
              <Button className="w-max text-base " onClick={openNewAccountModal}>
                <Plus />
                Nova Conta
              </Button>
            )}
          </div>
        )}

        {(isLoadingAccounts || accounts.length > 0) && (
          <div data-tour="accounts-stats">
            <AccountsStats
              isLoading={isLoadingAccounts}
              totalCheckingAccount={totalCheckingAccount}
              totalInvestmentAccount={totalInvestmentAccount}
              totalSavingAccount={totalSavingAccount}
            />
          </div>
        )}

        <AccountsList
          accounts={accounts}
          isLoading={isLoadingAccounts}
          canCreate={canCreate}
          canEdit={canEdit}
        />
      </div>

      <div data-tour="patrimony-card">
        <PatrimonyCard
          isLoading={isLoadingCalculations}
          percentage={monthlyVariation.percentage}
          isPositive={monthlyVariation.isPositive}
          totalPatrimony={totalPatrimony}
          value={monthlyVariation.value}
        />
      </div>

      <PageTour tourId={TOUR_IDS.ACCOUNTS} steps={accountsTourSteps} />
    </div>
  );
}
