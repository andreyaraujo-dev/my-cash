import { useContext } from 'react';
import { TransactionsContext } from '@/app/context/TransactionsContext';

export function useTransactionsContext() {
  return useContext(TransactionsContext);
}
