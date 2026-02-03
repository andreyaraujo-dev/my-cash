import { TrendingUp, TrendingDown, Wallet, Percent } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/views/components/ui/select';
import { MetricCard } from './components/MetricCard';
import { IncomeExpensesChart } from './components/IncomeExpensesChart';
import { ExpensesByCategoryChart } from './components/ExpensesByCategoryChart';
import { BalanceEvolutionChart } from './components/BalanceEvolutionChart';
import { useReportsController } from './hooks/useReportsController';
import { formatCurrency } from '@/app/utils/formatCurrency';

export function ReportsPage() {
  const {
    filters,
    incomeExpensesData,
    savingsRateData,
    averageBalanceData,
    isLoadingIncomeExpenses,
    isLoadingSavingsRate,
    isLoadingAverageBalance,
    handlePeriodChange,
  } = useReportsController();

  return (
    <div className="w-full h-full flex flex-col gap-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <div className="flex items-center gap-3">
          <Select defaultValue="current-month" onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-month">Mês atual</SelectItem>
              <SelectItem value="previous-month">Mês anterior</SelectItem>
              <SelectItem value="current-year">Ano atual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Receitas"
          value={formatCurrency(incomeExpensesData?.currentPeriod.income || 0)}
          subtitle={
            incomeExpensesData
              ? `${incomeExpensesData.comparison.incomeChange >= 0 ? '+' : ''}${incomeExpensesData.comparison.incomeChange}% vs mês anterior`
              : 'Carregando...'
          }
          icon={TrendingUp}
          colorClass="bg-green-500/10 text-green-500 border-green-500/20"
          isLoading={isLoadingIncomeExpenses}
        />
        <MetricCard
          title="Despesas"
          value={formatCurrency(incomeExpensesData?.currentPeriod.expense || 0)}
          subtitle={
            incomeExpensesData
              ? `${incomeExpensesData.comparison.expenseChange >= 0 ? '+' : ''}${incomeExpensesData.comparison.expenseChange}% vs mês anterior`
              : 'Carregando...'
          }
          icon={TrendingDown}
          colorClass="bg-red-500/10 text-red-500 border-red-500/20"
          isLoading={isLoadingIncomeExpenses}
        />
        <MetricCard
          title="Saldo Médio"
          value={formatCurrency(averageBalanceData?.averageBalance || 0)}
          subtitle="Últimos 6 meses"
          icon={Wallet}
          colorClass="bg-blue-500/10 text-blue-500 border-blue-500/20"
          isLoading={isLoadingAverageBalance}
        />
        <MetricCard
          title="Taxa de Poupança"
          value={`${savingsRateData?.savingsRate || 0}%`}
          subtitle="Do total de receitas"
          icon={Percent}
          colorClass="bg-purple-500/10 text-purple-500 border-purple-500/20"
          isLoading={isLoadingSavingsRate}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Income vs Expenses Chart - 2 columns */}
        <div className="lg:col-span-2">
          <IncomeExpensesChart />
        </div>

        {/* Expenses by Category Chart - 1 column */}
        <div className="lg:col-span-1">
          <ExpensesByCategoryChart filters={filters} />
        </div>
      </div>

      {/* Balance Evolution Chart - Full Width */}
      <div className="w-full">
        <BalanceEvolutionChart />
      </div>
    </div>
  );
}
