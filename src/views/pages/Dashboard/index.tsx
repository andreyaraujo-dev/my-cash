import { Accounts } from './components/Accounts';
import { DashboardContext, DashboardProvider } from '@/app/context/DashboardContext.tsx';
import { NewAccountModal } from '@/views/pages/Dashboard/components/Modals/NewAccountModal';
import { EditAccountModal } from '@/views/pages/Dashboard/components/Modals/EditAccountModal';
import { BalanceCard } from './components/BalanceCard';
import { RecentTransactions } from './components/RecentTransactions';

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="w-full h-full flex flex-col gap-4">
            <main className="flex-1 flex flex-col lg:flex-row gap-4 max-h-[100%]">
              <div className="w-full flex flex-col gap-4">
                <BalanceCard />
                <Accounts />
                <RecentTransactions />
              </div>
            </main>

            <NewAccountModal />
            {accountBeingEdited && <EditAccountModal />}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
