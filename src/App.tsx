import { Router } from './Router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/app/services/react-query/queryClient.ts';
import { Toaster } from '@/views/components/ui/toaster.tsx';
import { AuthProvider } from '@/app/context/AuthContext.tsx';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from '@/views/ThemeProvider';
import { SidebarProvider } from './views/components/ui/sidebar';
import { InitializeClarity } from './app/metrics/clarity';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <SidebarProvider>
            <Router />
          </SidebarProvider>
          <Toaster />
          <InitializeClarity />
        </AuthProvider>
      </ThemeProvider>
      {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
    </QueryClientProvider>
  );
}
