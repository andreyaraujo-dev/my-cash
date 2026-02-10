import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Outlet />
    </div>
  );
}
