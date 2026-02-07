export interface Category {
  id: string;
  name: string;
  icon: string;
  type: 'INCOME' | 'EXPENSE';
  color?: string;
  budget?: number;
  totalSpent?: number;
  transactions?: number;
}
