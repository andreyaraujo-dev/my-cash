import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthGuard } from './AuthGuard.tsx';

const AuthLayout = lazy(() =>
  import('../views/layouts/AuthLayout.tsx').then((module) => ({ default: module.AuthLayout })),
);
const DashboardLayout = lazy(() =>
  import('../views/layouts/DashboardLayout').then((module) => ({ default: module.DashboardLayout })),
);

const LandingPage = lazy(() =>
  import('../views/pages/Landing').then((module) => ({ default: module.LandingPage })),
);
const Login = lazy(() =>
  import('../views/pages/Login').then((module) => ({ default: module.Login })),
);
const Register = lazy(() =>
  import('../views/pages/Register').then((module) => ({ default: module.Register })),
);
const ForgotPassword = lazy(() =>
  import('../views/pages/ForgotPassword').then((module) => ({ default: module.ForgotPassword })),
);
const ResetPassword = lazy(() =>
  import('../views/pages/ResetPassword').then((module) => ({ default: module.ResetPassword })),
);
const Welcome = lazy(() =>
  import('../views/pages/Welcome').then((module) => ({ default: module.Welcome })),
);

const Dashboard = lazy(() =>
  import('../views/pages/Dashboard').then((module) => ({ default: module.Dashboard })),
);
const AccountsPage = lazy(() =>
  import('@/views/pages/Accounts/index.tsx').then((module) => ({ default: module.AccountsPage })),
);
const TransactionsPage = lazy(() =>
  import('@/views/pages/Transactions/index.tsx').then((module) => ({
    default: module.TransactionsPage,
  })),
);
const CategoriesPage = lazy(() =>
  import('@/views/pages/Categories/index.tsx').then((module) => ({ default: module.CategoriesPage })),
);
const ReportsPage = lazy(() =>
  import('@/views/pages/Reports/index.tsx').then((module) => ({ default: module.ReportsPage })),
);
const GoalsPage = lazy(() =>
  import('@/views/pages/Goals/index.tsx').then((module) => ({ default: module.GoalsPage })),
);
const Profile = lazy(() =>
  import('@/views/pages/Profile').then((module) => ({ default: module.Profile })),
);
const SubscriptionPage = lazy(() =>
  import('@/views/pages/Subscription').then((module) => ({ default: module.SubscriptionPage })),
);

function RouterFallback() {
  return <div className="min-h-screen w-full bg-background" />;
}

export function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouterFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route element={<AuthGuard isPrivate={false} />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
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
      </Suspense>
    </BrowserRouter>
  );
}
