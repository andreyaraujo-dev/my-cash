import { Spinner } from '@/views/components/Loading/Spinner';
import { Logo } from '@/views/components/Logo';
import { Transition } from '@headlessui/react';

interface LaunchScreenProps {
  isLoading: boolean;
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed top-0 left-0 w-full h-full bg-zinc-900 grid place-items-center">
        <div className="flex flex-col gap-4 items-center">
          <Logo className="h-10 text-white" />
          <Spinner />
        </div>
      </div>
    </Transition>
  );
}
