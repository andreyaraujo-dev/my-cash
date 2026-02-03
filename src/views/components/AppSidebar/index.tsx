import {
  BarChart3,
  CreditCard,
  Home,
  PieChart,
  Settings,
  Wallet,
  Target,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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
import { cn } from '@/lib/utils';

// Menu items para o app de finanças
const items = [
  {
    title: 'Dashboard',
    url: '/',
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
    title: 'Configurações',
    url: '/settings',
    icon: Settings,
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

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader
        className={cn('border-b border-sidebar-border', open ? 'p-6' : 'py-6 px-3 min-h-6')}
      >
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="items-center justify-start flex gap-2">
                <img src="/favicon.svg" alt="MyCash" className="h-8 w-8" />
                {open && <span className="text-xl font-semibold">cash+</span>}
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
                        onClick={signout}
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
  );
}
