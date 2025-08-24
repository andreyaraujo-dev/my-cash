import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthGuard } from './AuthGuard.tsx';
import { Login } from '../views/pages/Login';
import { Register } from '../views/pages/Register';
import { AuthLayout } from '../views/layouts/AuthLayout.tsx';
import { Dashboard } from '../views/pages/Dashboard';
import { DashboardLayout } from '../views/layouts/DashboardLayout';

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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
