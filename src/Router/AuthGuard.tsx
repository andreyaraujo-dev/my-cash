import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/app/hooks/useAuth.ts';

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
