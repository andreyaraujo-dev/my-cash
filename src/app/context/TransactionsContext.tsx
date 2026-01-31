/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useCallback, useState } from 'react';

interface TransactionsContextValue {
  isNewTransactionModalOpen: boolean;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
  closeNewTransactionModal: () => void;
}

export const TransactionsContext = createContext({} as TransactionsContextValue);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        isNewTransactionModalOpen,
        newTransactionType,
        openNewTransactionModal,
        closeNewTransactionModal,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
