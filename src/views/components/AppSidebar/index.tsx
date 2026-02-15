import { BarChart3, CreditCard, Home, PieChart, User, Wallet, Target, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

import { useAuth } from '@/app/hooks/useAuth';
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
    title: 'Sair',
    url: '#',
    icon: LogOut,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { open } = useSidebar();
  const { signout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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
                <img src="/favicon.svg" alt="MyCash" className="h-8 w-8" />
                {open && <span className="text-xl font-semibold">myCash</span>}
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
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {footerItems.map((item) => {
                const isActive = location.pathname === item.url;
                const isSignOut = item.title === 'Sair';

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

    <Modal open={isLogoutModalOpen} title="Sair da conta" onClose={() => setIsLogoutModalOpen(false)}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-orange-500/10 flex items-center justify-center">
          <LogOut className="w-6 h-6 text-orange-500" />
        </div>

        <p className="text-zinc-100 font-bold tracking-[-0.5px]">
          Tem certeza que deseja sair?
        </p>
        <p className="tracking-[-0.5px] text-zinc-400 text-sm">
          Você precisará fazer login novamente para acessar sua conta.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        <Button className="w-full" variant="destructive" onClick={signout}>
          Sim, quero sair
        </Button>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setIsLogoutModalOpen(false)}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
    </>
  );
}
