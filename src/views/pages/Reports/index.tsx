import { TrendingUp, TrendingDown, Wallet, Percent, Download } from 'lucide-react';
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
import { useState, useEffect } from 'react';
import { useToast } from '@/app/hooks/useToast';

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

  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (isExporting) {
      const duration = 3500; // duração total em ms
      const interval = 50; // atualiza a cada 50ms
      const increment = (interval / duration) * 100;

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + increment;
        });
      }, interval);

      return () => clearInterval(timer);
    } else {
      setProgress(0);
    }
  }, [isExporting]);

  const handleExport = async () => {
    setIsExporting(true);

    // Simula chamada à API com timer mais longo
    await new Promise((resolve) => setTimeout(resolve, 3500));

    setIsExporting(false);
    toast({
      title: 'Sucesso!',
      description: 'Relatório exportado com sucesso!',
      duration: 3000,
    });
  };

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
          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="relative h-12 px-4 rounded-md border border-border bg-background overflow-hidden disabled:cursor-not-allowed transition-all"
          >
            {/* Líquido verde se enchendo gradualmente */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 transition-all duration-100"
              style={{
                width: `${progress}%`,
                boxShadow: 'inset -10px 0 20px -10px rgba(16, 185, 129, 0.6)',
              }}
            >
              {/* Efeito de onda no topo do líquido */}
              <div
                className="absolute top-0 left-0 right-0 h-full"
                style={{
                  background: `repeating-linear-gradient(
                    90deg,
                    rgba(255, 255, 255, 0.1) 0px,
                    transparent 2px,
                    transparent 8px,
                    rgba(255, 255, 255, 0.1) 10px
                  )`,
                  animation: isExporting ? 'wave 1.5s linear infinite' : 'none',
                }}
              />

              {/* Brilho do líquido */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                }}
              />
            </div>

            {/* Conteúdo do botão */}
            <span
              className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${
                progress > 50 ? 'text-white' : 'text-foreground'
              }`}
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Exportando...' : 'Exportar'}
            </span>

            {/* CSS para animação de onda */}
            <style>{`
              @keyframes wave {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(10px);
                }
              }
            `}</style>
          </button>
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
