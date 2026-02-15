/* eslint-disable no-unused-vars */
export enum RecurrenceFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export interface Transaction {
  id: string;
  name: string;
  categoryId: string;
  bankAccountId: string;
  value: number;
  type: 'INCOME' | 'EXPENSE';
  date: string;
  category?: {
    id: string;
    name: string;
    icon: string;
  };
  isPaid?: boolean;
  recurrenceFrequency?: RecurrenceFrequency;
  recurrenceEndDate?: string;
  recurrenceGroupId?: string;
}
