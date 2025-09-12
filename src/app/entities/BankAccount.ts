/* eslint-disable no-unused-vars */
export enum BankAccountType {
  checking = 'CHECKING',
  investment = 'INVESTMENT',
  cash = 'CASH',
  saving = 'SAVING',
}

export interface BankAccount {
  id: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
  currentBalance: number;
}
