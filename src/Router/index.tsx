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

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
