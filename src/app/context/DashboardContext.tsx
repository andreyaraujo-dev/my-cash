/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useCallback, useState } from 'react';
import { BankAccount } from '@/app/entities/BankAccount.ts';

interface DashboardContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isEditAccountModalOpen: boolean;
  accountBeingEdited: BankAccount | null;
  openNewAccountModal: () => void;
  toggleValuesVisibility: () => void;
  closeNewAccountModal: () => void;
  openEditAccountModal: (bankAccount: BankAccount) => void;
  closeEditAccountModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | null>(null);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevVisible) => !prevVisible);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount);
    setIsEditAccountModalOpen(true);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null);
    setIsEditAccountModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        openNewAccountModal,
        isNewAccountModalOpen,
        closeNewAccountModal,
        accountBeingEdited,
        isEditAccountModalOpen,
        closeEditAccountModal,
        openEditAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
