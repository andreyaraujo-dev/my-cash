import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { localStorageKeys } from '@/app/config/localStorageKeys.ts';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/app/hooks/useToast.ts';
import { LaunchScreen } from '@/views/components/LaunchScreen';
import { User } from '@/app/entities/User.ts';
import { useGetMe } from '../hooks/useGetMe';
import { useUserAccessStore } from '@/app/store/useUserAccessStore';

interface AuthContextValue {
  signedIn: boolean;
  /* eslint-disable no-unused-vars */
  signin(accessToken: string): void;
  signout(): void;
  user?: User;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);
    return !!storedAccessToken;
  });

  const { toast } = useToast();

  const { isError, isFetching, isSuccess, data } = useGetMe(signedIn);
  const setUserAccess = useUserAccessStore((state) => state.setUserAccess);
  const resetUserAccess = useUserAccessStore((state) => state.resetUserAccess);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      setUserAccess({
        isAccountOwner: data.isAccountOwner ?? true,
        sharedAccessLevel: data.sharedAccessLevel ?? null,
        name: data.name,
        email: data.email,
      });
    }
  }, [data, setUserAccess]);

  const [minTimePassed, setMinTimePassed] = useState(!signedIn);

  useEffect(() => {
    if (!signedIn) {
      setMinTimePassed(true);
      return;
    }

    const timer = setTimeout(() => setMinTimePassed(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const showLaunchScreen = isFetching || !minTimePassed;

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    resetUserAccess();
    queryClient.removeQueries();
    queryClient.clear();
    setSignedIn(false);
  }, [queryClient, resetUserAccess]);

  useEffect(() => {
    if (isError) {
      toast({ variant: 'destructive', description: 'Sua sessão expirou!' });
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider value={{ signedIn: isSuccess && signedIn, signin, signout, user: data }}>
      <LaunchScreen isLoading={showLaunchScreen} />
      {!showLaunchScreen && children}
    </AuthContext.Provider>
  );
}
