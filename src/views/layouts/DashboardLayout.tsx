import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppSidebar } from '../components/AppSidebar';
import { SidebarTrigger, SidebarInset } from '../components/ui/sidebar';
import { NotificationCenter } from '../components/NotificationCenter';
import { UserMenu } from '../components/UserMenu';
import { useAccessPolicy } from '@/app/hooks/useAccessPolicy';
import { TrialExpiredModal } from '@/views/components/TrialExpiredModal';

const TITLES = [
  { pathname: '/home', title: 'Dashboard' },
  { pathname: '/accounts', title: 'Minhas Contas' },
  { pathname: '/transactions', title: 'Minhas Transações' },
  { pathname: '/categories', title: 'Minhas Categorias' },
  { pathname: '/reports', title: 'Relatórios' },
  { pathname: '/goals', title: 'Metas' },
  { pathname: '/profile', title: 'Perfil' },
  { pathname: '/profile/subscription', title: 'Gerenciar assinatura' },
  { pathname: '/profile/people', title: 'Pessoas' },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const { isRestricted, subscription } = useAccessPolicy();
  const [isTrialExpiredModalOpen, setIsTrialExpiredModalOpen] = useState(false);

  const currentTitle = TITLES.find((title) => title.pathname === pathname)?.title;
  const SESSION_STORAGE_KEY = 'trial_expired_modal_shown';

  useEffect(() => {
    if (!isRestricted) return;

    const blockedByRoute =
      (location.state as { blockedBy?: string } | null)?.blockedBy === 'trial_expired';

    if (blockedByRoute) {
      setIsTrialExpiredModalOpen(true);
      navigate(pathname, { replace: true });
      return;
    }

    const alreadyShown = sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
    if (!alreadyShown) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      setIsTrialExpiredModalOpen(true);
    }
  }, [isRestricted, location.state, navigate, pathname]);

  const handleUpgrade = () => {
    setIsTrialExpiredModalOpen(false);
    navigate('/profile/subscription');
  };

  const handleBlockedAreaAttempt = () => {
    setIsTrialExpiredModalOpen(true);
  };

  return (
    <div className="flex h-screen w-full">
      <AppSidebar onBlockedAreaAttempt={handleBlockedAreaAttempt} />

      <SidebarInset className="flex flex-col min-w-0">
        <div className="flex items-center justify-between gap-2 border-b p-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">{currentTitle}</h1>
          </div>

          <div className="flex items-center gap-2">
            <NotificationCenter />
            <UserMenu />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 lg:px-8 lg:pt-6 lg:pb-8">
          <Outlet />
        </div>
      </SidebarInset>

      <TrialExpiredModal
        open={isTrialExpiredModalOpen}
        onOpenChange={setIsTrialExpiredModalOpen}
        onUpgrade={handleUpgrade}
        trialEndsAt={subscription?.trialEndsAt}
        planValue={subscription?.value}
      />
    </div>
  );
}
