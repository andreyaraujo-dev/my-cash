/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { SharedAccessLevel } from '@/app/entities/Person';

export interface UserAccessState {
  sharedAccessLevel: SharedAccessLevel | null;
  isAccountOwner: boolean;
  name: string | null;
  email: string | null;
  setUserAccess: (data: {
    sharedAccessLevel?: SharedAccessLevel | null;
    isAccountOwner: boolean;
    name?: string;
    email?: string;
  }) => void;
  resetUserAccess: () => void;
}

const initialState = {
  sharedAccessLevel: null as SharedAccessLevel | null,
  isAccountOwner: true,
  name: null as string | null,
  email: null as string | null,
};

export const useUserAccessStore = create<UserAccessState>((set) => ({
  ...initialState,
  setUserAccess: (userAccessData) =>
    set((state) => ({
      ...state,
      ...(userAccessData.sharedAccessLevel !== undefined && {
        sharedAccessLevel: userAccessData.sharedAccessLevel,
      }),
      isAccountOwner: userAccessData.isAccountOwner,
      ...(userAccessData.name !== undefined && { name: userAccessData.name }),
      ...(userAccessData.email !== undefined && { email: userAccessData.email }),
    })),
  resetUserAccess: () => set(initialState),
}));
