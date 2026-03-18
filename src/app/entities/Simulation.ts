export interface MonthlyProjection {
  month: number;
  year: number;
  balance: number;
  income: number;
  expense: number;
  /** Valor simulado no mês: positivo para entrada, negativo para saída */
  simulatedDelta?: number;
}

export interface MonthOverBudget {
  month: number;
  year: number;
  spending: number;
  budget: number;
}

export interface BudgetImpactItem {
  categoryId: string;
  categoryName: string;
  monthsOverBudget: MonthOverBudget[];
}

export interface GoalImpactItem {
  goalId: string;
  goalName: string;
  newEstimatedDueDate: string | null;
  impactOnTarget: string | null;
}

export interface SimulateResponse {
  baseProjection: MonthlyProjection[];
  simulatedProjection: MonthlyProjection[];
  budgetImpact: BudgetImpactItem[];
  goalsImpact: GoalImpactItem[];
}

export interface SimulateParams {
  period?: 12 | 24 | 60;
  type: 'INCOME' | 'EXPENSE';
  value: number;
  date: string;
  bankAccountId?: string;
  categoryId?: string;
  parcels?: number;
  entrada?: number;
  juros?: number;
  recurrenceGroupId?: string;
}
