import {
  BarChart3,
  CreditCard,
  Home,
  PieChart,
  User,
  Users,
  Wallet,
  Target,
  LogOut,
  Lock,
} from 'lucide-react';
import { MyCashLogo } from '@/views/components/icons/MyCashLogo';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import { useAuth } from '@/app/hooks/useAuth';
import { useUserAccessStore } from '@/app/store/useUserAccessStore';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/views/components/ui/sidebar';
import { Modal } from '@/views/components/Modal';
import { Button } from '@/views/components/ui/button';
import { cn } from '@/lib/utils';
import { isPremiumRoute } from '@/app/config/accessPolicy';
import { useAccessPolicy } from '@/app/hooks/useAccessPolicy';
import { useSubscription } from '@/app/hooks/useSubscription';
import { PeoplePremiumRequiredModal } from '@/views/pages/People/components/PeoplePremiumRequiredModal';

// Menu items para o app de finanças
const items = [
  {
    title: 'Dashboard',
    url: '/home',
    icon: Home,
  },
  {
    title: 'Transações',
    url: '/transactions',
    icon: CreditCard,
  },
  {
    title: 'Contas',
    url: '/accounts',
    icon: Wallet,
  },
  {
    title: 'Categorias',
    url: '/categories',
    icon: PieChart,
  },
  {
    title: 'Relatórios',
    url: '/reports',
    icon: BarChart3,
  },
  {
    title: 'Metas',
    url: '/goals',
    icon: Target,
  },
];

const footerItems = [
  {
    title: 'Perfil',
    url: '/profile',
    icon: User,
  },
  {
    title: 'Pessoas',
    url: '/profile/people',
    icon: Users,
  },
  {
    title: 'Sair',
    url: '#',
    icon: LogOut,
  },
];

interface AppSidebarProps {
  onBlockedAreaAttempt?: () => void;
}

export function AppSidebar({ onBlockedAreaAttempt }: AppSidebarProps) {
  const location = useLocation();
  const { open } = useSidebar();
  const { signout } = useAuth();
  const isAccountOwner = useUserAccessStore((state) => state.isAccountOwner);
  const { isRestricted } = useAccessPolicy();
  const { subscription } = useSubscription();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isPeoplePremiumModalOpen, setIsPeoplePremiumModalOpen] = useState(false);

  const isPeoplePremium = subscription?.plan === 'PREMIUM' && subscription?.isActive;

  const visibleFooterItems = footerItems.filter(
    (item) => item.title !== 'Pessoas' || isAccountOwner
  );

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader
          className={cn('border-b border-sidebar-border', open ? 'p-6' : 'py-6 px-3 min-h-6')}
        >
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem className="items-center justify-start flex gap-2">
                  <MyCashLogo showText={open} iconClassName="h-8 w-8" />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  const isActive = location.pathname === item.url;
                  const isBlocked = isRestricted && isPremiumRoute(item.url);
                  const buttonClassName = `w-full justify-start gap-3 h-12 ${
                    isBlocked
                      ? 'text-muted-foreground opacity-60 cursor-not-allowed'
                      : isActive
                        ? 'bg-secondary text-secondary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                  }`;

                  if (isBlocked) {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          tooltip={`${item.title} (Premium)`}
                          className={buttonClassName}
                          onClick={onBlockedAreaAttempt}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary">
                            Premium
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className={buttonClassName}
                      >
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {visibleFooterItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  const isSignOut = item.title === 'Sair';
                  const isPeople = item.title === 'Pessoas';

                  if (isSignOut) {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          tooltip={item.title}
                          className="w-full justify-start gap-3 h-12 text-muted-foreground hover:text-foreground"
                          onClick={() => setIsLogoutModalOpen(true)}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }

                  if (isPeople && !isPeoplePremium) {
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          tooltip="Pessoas (Premium)"
                          className="w-full justify-start gap-3 h-12 text-muted-foreground opacity-60 hover:opacity-80"
                          onClick={() => setIsPeoplePremiumModalOpen(true)}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          <Lock className="ml-auto h-4 w-4" />
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.title}
                        className={`w-full justify-start gap-3 h-12 ${
                          isActive
                            ? 'bg-secondary text-secondary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>

      <PeoplePremiumRequiredModal
        open={isPeoplePremiumModalOpen}
        onClose={() => setIsPeoplePremiumModalOpen(false)}
      />

      <Modal
        open={isLogoutModalOpen}
        title="Sair da conta"
        onClose={() => setIsLogoutModalOpen(false)}
      >
        <div className="flex flex-col items-center text-center gap-6">
          <div className="w-[52px] h-[52px] rounded-full bg-orange-500/10 flex items-center justify-center">
            <LogOut className="w-6 h-6 text-orange-500" />
          </div>

          <p className="text-foreground font-bold tracking-[-0.5px]">
            Tem certeza que deseja sair?
          </p>
          <p className="tracking-[-0.5px] text-muted-foreground text-sm">
            Você precisará fazer login novamente para acessar sua conta.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <Button className="w-full" variant="destructive" onClick={signout}>
            Sim, quero sair
          </Button>
          <Button className="w-full" variant="outline" onClick={() => setIsLogoutModalOpen(false)}>
            Cancelar
          </Button>
        </div>
      </Modal>
    </>
  );
}
