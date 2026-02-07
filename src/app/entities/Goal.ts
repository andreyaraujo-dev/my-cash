export interface Goal {
  id: string;
  name: string;
  targetValue: number; // valor alvo
  currentValue: number; // valor atual (progresso)
  dueDate: string; // data de vencimento
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  description?: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    icon: string;
  };
  importance: 'LOW' | 'MEDIUM' | 'HIGH';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}
