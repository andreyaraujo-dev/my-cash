import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthGuard } from './AuthGuard.tsx';
import { Login } from '../views/pages/Login';
import { Register } from '../views/pages/Register';
import { AuthLayout } from '../views/layouts/AuthLayout.tsx';
import { Dashboard } from '../views/pages/Dashboard';
import { DashboardLayout } from '../views/layouts/DashboardLayout';
import { AccountsPage } from '@/views/pages/Accounts/index.tsx';
import { TransactionsPage } from '@/views/pages/Transactions/index.tsx';
import { CategoriesPage } from '@/views/pages/Categories/index.tsx';
import { ReportsPage } from '@/views/pages/Reports/index.tsx';
import { GoalsPage } from '@/views/pages/Goals/index.tsx';
import { Profile } from '@/views/pages/Profile';
import { SubscriptionPage } from '@/views/pages/Subscription';
import { Welcome } from '@/views/pages/Welcome';
import { LandingPage } from '@/views/pages/Landing';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/welcome" element={<Welcome />} />
          <Route element={<DashboardLayout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/subscription" element={<SubscriptionPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
