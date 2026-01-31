// GET /reports/income-expenses
export interface IncomeExpensesReport {
  currentPeriod: {
    month: number;
    year: number;
    income: number;
    expense: number;
  };
  previousPeriod: {
    month: number;
    year: number;
    income: number;
    expense: number;
  };
  comparison: {
    incomeChange: number;
    incomeChangeAbsolute: number;
    expenseChange: number;
    expenseChangeAbsolute: number;
  };
}

// GET /reports/average-balance
export interface AverageBalanceReport {
  averageBalance: number;
  period: {
    startMonth: number;
    startYear: number;
    endMonth: number;
    endYear: number;
  };
  monthlyBalances: Array<{
    month: number;
    year: number;
    balance: number;
  }>;
}

// GET /reports/savings-rate
export interface SavingsRateReport {
  period: {
    month: number;
    year: number;
  };
  income: number;
  expense: number;
  saved: number;
  savingsRate: number;
  comparison: {
    previousRate: number;
    rateChange: number;
    rateChangeAbsolute: number;
  };
}

// GET /reports/expenses-by-category
export interface ExpensesByCategoryReport {
  period: {
    month: number;
    year: number;
  };
  totalExpenses: number;
  categories: Array<{
    categoryId: string | null;
    categoryName: string;
    categoryIcon: string;
    amount: number;
    percentage: number;
    transactionCount: number;
  }>;
}

export interface ReportsFilters {
  month?: number;
  year?: number;
}
