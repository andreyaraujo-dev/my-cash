import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TourState {
  completedTours: string[];
  // eslint-disable-next-line no-unused-vars
  completeTour: (tourId: string) => void;
  // eslint-disable-next-line no-unused-vars
  isTourCompleted: (tourId: string) => boolean;
  resetTours: () => void;
}

export const useTourStore = create<TourState>()(
  persist(
    (set, get) => ({
      completedTours: [],
      completeTour: (tourId) =>
        set((state) => ({
          completedTours: state.completedTours.includes(tourId)
            ? state.completedTours
            : [...state.completedTours, tourId],
        })),
      isTourCompleted: (tourId) => get().completedTours.includes(tourId),
      resetTours: () => set({ completedTours: [] }),
    }),
    { name: 'tour-storage' },
  ),
);
