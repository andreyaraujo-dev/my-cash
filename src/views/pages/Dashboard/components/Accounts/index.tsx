import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { SliderNavigation } from '@/views/pages/Dashboard/components/Accounts/SliderNavigation.tsx';
import { useAccountsController } from '@/views/pages/Dashboard/components/Accounts/useAccountsController.ts';
import { Spinner } from '@/views/components/Loading/Spinner';
import { PlusIcon } from 'lucide-react';
import { AccountCard } from '../AccountCard';

export function Accounts() {
  const { sliderState, setSliderState, windowWidth, isLoading, accounts, openNewAccountModal } =
    useAccountsController();

  return (
    <div className="bg-zinc-950 w-full h-max flex flex-col">
      {isLoading && (
        <div className="flex items-center justify-center h-full w-full">
          <Spinner className="w-10 h-10" />
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
                      <AccountCard data={account} />
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
