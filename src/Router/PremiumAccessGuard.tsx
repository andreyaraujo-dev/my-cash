import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isPremiumRoute } from '@/app/config/accessPolicy';
import { useAccessPolicy } from '@/app/hooks/useAccessPolicy';

export function PremiumAccessGuard() {
  const location = useLocation();
  const { isRestricted } = useAccessPolicy();

  if (!isRestricted) {
    return <Outlet />;
  }

  if (isPremiumRoute(location.pathname)) {
    return (
      <Navigate
        to="/home"
        replace
        state={{
          blockedBy: 'trial_expired',
          attemptedPath: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
}
