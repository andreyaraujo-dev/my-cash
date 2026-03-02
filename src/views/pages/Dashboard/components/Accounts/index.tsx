import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { SliderNavigation } from '@/views/pages/Dashboard/components/Accounts/SliderNavigation.tsx';
import { useAccountsController } from '@/views/pages/Dashboard/components/Accounts/useAccountsController.ts';
import { Skeleton } from '@/views/components/ui/skeleton';
import { PlusIcon } from 'lucide-react';
import { AccountCard } from '../AccountCard';

interface AccountsProps {
  readOnly?: boolean;
}

export function Accounts({ readOnly = false }: AccountsProps) {
  const { sliderState, setSliderState, windowWidth, isLoading, accounts, openNewAccountModal } =
    useAccountsController();

  return (
    <div className="bg-background w-full h-max flex flex-col">
      {isLoading && (
        <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
          <div className="mb-4">
            <Skeleton className="h-6 w-36" />
          </div>
          <div className="flex gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="p-6 rounded-lg border-2 border-muted min-w-[200px] flex-1 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-7 w-32" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-4">
                  <strong className="text-white tracking-[-1px] text-lg font-bold">
                    Minhas contas
                  </strong>
                </div>

                {readOnly ? (
                  <div className="h-52 border-2 border-dashed border-muted rounded-2xl flex flex-col items-center justify-center gap-3 text-muted-foreground">
                    <span className="text-sm font-medium">Conta limitada</span>
                    <span className="text-xs text-center max-w-[220px]">
                      Para criar contas, assine o plano e desbloqueie os recursos completos.
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={openNewAccountModal}
                    className="h-52 border-2 border-dashed border-blue-600 rounded-2xl flex flex-col items-center justify-center gap-4 text-white"
                  >
                    <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                      <PlusIcon className="w-6 h-6" />
                    </div>

                    <span className="tracking-[-0.5px] font-medium block w-32 text-center">
                      Cadastre uma nova conta
                    </span>
                  </button>
                )}
              </>
            )}
            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth >= 500 ? 2.1 : 1.1}
                  onSlideChange={(swiper) => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                >
                  <div className="flex items-center justify-between mb-4" slot="container-start">
                    <strong className="text-white tracking-[-1px] text-lg font-bold">
                      Minhas contas
                    </strong>

                    <SliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  {accounts.map((account) => (
                    <SwiperSlide key={account.id}>
                      <AccountCard data={account} readOnly={readOnly} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
