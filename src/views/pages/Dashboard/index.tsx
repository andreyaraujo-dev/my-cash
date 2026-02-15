import { Accounts } from './components/Accounts';
import { DashboardContext, DashboardProvider } from '@/app/context/DashboardContext.tsx';
import { NewAccountModal } from '@/views/pages/Dashboard/components/Modals/NewAccountModal';
import { EditAccountModal } from '@/views/pages/Dashboard/components/Modals/EditAccountModal';
import { BalanceCard } from './components/BalanceCard';
import { RecentTransactions } from './components/RecentTransactions';
import { PageTour } from '@/views/components/Tour/PageTour';
import { homeTourSteps, TOUR_IDS } from '@/views/components/Tour/tours';

export function Dashboard() {
  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="w-full h-full flex flex-col gap-4">
            <main className="flex-1 flex flex-col lg:flex-row gap-4 max-h-[100%]">
              <div className="w-full flex flex-col gap-4">
                <div data-tour="balance-card">
                  <BalanceCard />
                </div>
                <div data-tour="accounts-section">
                  <Accounts />
                </div>
                <div data-tour="recent-transactions">
                  <RecentTransactions />
                </div>
              </div>
            </main>

            <NewAccountModal />
            {accountBeingEdited && <EditAccountModal />}

            <PageTour tourId={TOUR_IDS.HOME} steps={homeTourSteps} />
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
