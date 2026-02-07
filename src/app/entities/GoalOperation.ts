export interface GoalOperation {
  id: string;
  goalId: string;
  type: 'DEPOSIT' | 'WITHDRAW'; // Depositar (guardar) ou Retirar
  value: number;
  bankAccountId: string;
  bankAccount?: {
    id: string;
    name: string;
  };
  transactionId: string; // ID da transação criada
  createdAt: string;
  description?: string;
}
