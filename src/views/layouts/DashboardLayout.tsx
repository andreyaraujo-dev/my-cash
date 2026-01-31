import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '../components/AppSidebar';
import { SidebarTrigger, SidebarInset } from '../components/ui/sidebar';
import { UserMenu } from '../components/UserMenu';

const TITLES = [
  { pathname: '/', title: 'Dashboard' },
  { pathname: '/accounts', title: 'Minhas Contas' },
  { pathname: '/transactions', title: 'Minhas Transações' },
  { pathname: '/categories', title: 'Minhas Categorias' },
  { pathname: '/reports', title: 'Relatórios' },
];

export function DashboardLayout() {
  const { pathname } = useLocation();
  const currentTitle = TITLES.find((title) => title.pathname === pathname)?.title;

  return (
    <div className="flex h-screen w-full">
      <AppSidebar />

      <SidebarInset className="flex flex-col min-w-0">
        <div className="flex items-center justify-between gap-2 border-b p-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">{currentTitle}</h1>
          </div>

          <UserMenu />
        </div>

        <div className="flex-1 overflow-auto p-4 lg:px-8 lg:pt-6 lg:pb-8">
          <Outlet />
        </div>
      </SidebarInset>
    </div>
  );
}
