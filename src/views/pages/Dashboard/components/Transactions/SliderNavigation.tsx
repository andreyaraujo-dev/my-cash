import { useSwiper } from 'swiper/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export function SliderNavigation() {
  const swiper = useSwiper();

  return (
    <>
      <button
        type="button"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-zinc-950 to-transparent z-10"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeftIcon className="w-6 h-6 text-zinc-100" />
      </button>
      <button
        type="button"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-gradient-to-l from-zinc-950 to-to-transparent z-10"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRightIcon className="w-6 h-6 text-zinc-100" />
      </button>
    </>
  );
}
