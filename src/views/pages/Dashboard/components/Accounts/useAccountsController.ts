import { useMemo, useState } from 'react';
import { useWindowWidth } from '@/app/hooks/useWindowWidth.ts';
import { useDashboard } from '@/app/hooks/useDashboard.ts';
import { useBankAccounts } from '@/app/hooks/useBankAccounts.ts';
import { BankAccount, BankAccountType } from '@/app/entities/BankAccount';

export function useAccountsController() {
  const windowWidth = useWindowWidth();
  const { areValuesVisible, toggleValuesVisibility } = useDashboard();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  const { openNewAccountModal } = useDashboard();
  const { accounts, isFetching } = useBankAccounts();

  const currentBalance = useMemo(() => {
    return accounts.reduce((total, account) => total + account.currentBalance, 0);
  }, [accounts]);

  function accountsTypeMapper(account: BankAccount) {
    switch (account.type) {
      case BankAccountType.cash:
        return 'Dinheiro';
      case BankAccountType.investment:
        return 'Conta de Investimento';
      case BankAccountType.saving:
        return 'Conta Poupança';
      case BankAccountType.checking:
        return 'Conta Corrente';
      default:
        return 'Conta Corrente';
    }
  }

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    currentBalance,
    accountsTypeMapper,
  };
}
