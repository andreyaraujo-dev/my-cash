import ilustration from '../../assets/ilustration.png';
import { Logo } from '@/views/components/Logo';
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center flex-col gap-16">
        <img src="/cash-logo.svg" alt="myCash" className="h-40 w-40" />

        <div className="w-full max-w-[504px] px-8">
          <Outlet />
        </div>
      </div>
      <div className="w-1/2 h-full p-8 hidden lg:flex items-center justify-center relative">
        <img
          src={ilustration}
          alt="ilustration"
          className="object-cover w-full h-full max-w-[656px] max-h-[960px] select-none rounded-[32px]"
        />

        <div className="max-w-[656px] bg-white p-10 mx-8 absolute bottom-8 rounded-b-[32px]">
          <Logo className="text-blue-900 h-8" />

          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o myCash, e o melhor,
            totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
