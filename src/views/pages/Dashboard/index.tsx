import { Accounts } from './components/Accounts';
import { DashboardContext, DashboardProvider } from '@/app/context/DashboardContext.tsx';
import { NewAccountModal } from '@/views/pages/Dashboard/components/Modals/NewAccountModal';
import { NewTransactionModal } from '@/views/pages/Dashboard/components/Modals/NewTransactionModal';
import { EditAccountModal } from '@/views/pages/Dashboard/components/Modals/EditAccountModal';
import { BalanceCard } from './components/BalanceCard';
import { Transactions } from './components/Transactions';

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="w-full h-full flex flex-col gap-4">
            <main className="flex-1 flex flex-col lg:flex-row gap-4 max-h-[100%]">
              <div className="w-full lg:w-2/3 flex flex-col gap-4">
                <BalanceCard />
                <Accounts />
              </div>

              <div className="w-full max-h-full lg:w-1/3">
                <Transactions />
              </div>
            </main>

            <NewAccountModal />
            <NewTransactionModal />
            {accountBeingEdited && <EditAccountModal />}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
