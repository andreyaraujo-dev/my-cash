import { Accounts } from './components/Accounts';
import { DashboardContext, DashboardProvider } from '@/app/context/DashboardContext.tsx';
import { NewAccountModal } from '@/views/pages/Accounts/components/NewAccountModal';
import { EditAccountModal } from '@/views/pages/Accounts/components/EditAccountModal';
import { BalanceCard } from './components/BalanceCard';
import { RecentTransactions } from './components/RecentTransactions';
import { PageTour } from '@/views/components/Tour/PageTour';
import { homeTourSteps, TOUR_IDS } from '@/views/components/Tour/tours';
import { useAccessPolicy } from '@/app/hooks/useAccessPolicy';
import { useSharedAccessLevel } from '@/app/hooks/useSharedAccessLevel';
import { Lock } from 'lucide-react';

export function Dashboard() {
  const { isRestricted } = useAccessPolicy();
  const { canCreate, canEdit } = useSharedAccessLevel();
  const isReadOnly = isRestricted || !canEdit;

  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="w-full h-full flex flex-col gap-4">
            {isRestricted && (
              <div className="w-full rounded-lg border border-amber-900/40 bg-amber-900/10 p-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-amber-700" />
                  <p className="text-sm text-amber-700 font-medium">Conta limitada</p>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Seu trial terminou. O dashboard está em modo leitura. Assine para voltar a editar
                  dados.
                </p>
              </div>
            )}

            <main className="flex-1 flex flex-col lg:flex-row gap-4 max-h-[100%]">
              <div className="w-full flex flex-col gap-4">
                <div data-tour="balance-card">
                  <BalanceCard />
                </div>
                <div data-tour="accounts-section">
                  <Accounts readOnly={isReadOnly} />
                </div>
                <div data-tour="recent-transactions">
                  <RecentTransactions />
                </div>
              </div>
            </main>

            {canCreate && !isRestricted && <NewAccountModal />}
            {canEdit && accountBeingEdited && <EditAccountModal />}

            <PageTour tourId={TOUR_IDS.HOME} steps={homeTourSteps} />
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  );
}
