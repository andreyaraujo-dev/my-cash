import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { useSubscription } from '@/app/hooks/useSubscription';
import { SimulationPremiumRequiredModal } from './components/SimulationPremiumRequiredModal';
import { SimulateForm } from './components/SimulateForm';
import { SimulationSummaryCards } from './components/SimulationSummaryCards';
import { ProjectionTable } from './components/ProjectionTable';
import { ProjectionChart } from './components/ProjectionChart';
import { BudgetImpactTable } from './components/BudgetImpactTable';
import { GoalsImpactCards } from './components/GoalsImpactCards';
import { useSimulationsController } from './hooks/useSimulationsController';

export function SimulationsPage() {
  const navigate = useNavigate();
  const { subscription } = useSubscription();
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  const isPremium = Boolean(subscription?.plan === 'PREMIUM' && subscription?.isActive);

  const { form, handleSubmit, result, isPending, accountsOptions, categoriesOptions } =
    useSimulationsController();

  useEffect(() => {
    if (!isPremium) {
      setIsPremiumModalOpen(true);
    }
  }, [isPremium]);

  const handlePremiumModalClose = () => {
    setIsPremiumModalOpen(false);
    navigate('/home');
  };

  if (!isPremium) {
    return (
      <SimulationPremiumRequiredModal open={isPremiumModalOpen} onClose={handlePremiumModalClose} />
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-6 pb-6">
      <header>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-muted-foreground" />
          <div>
            <h1 className="text-2xl font-bold">Simulações</h1>
            <span className="text-sm text-muted-foreground">
              Simule eventos financeiros e visualize o impacto no seu orçamento, metas e fluxo de
              caixa.
            </span>
          </div>
        </div>
      </header>

      <SimulateForm
        form={form}
        onSubmit={handleSubmit}
        isPending={isPending}
        accountsOptions={accountsOptions}
        categoriesOptions={categoriesOptions}
      />

      {result && (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Resultados da simulação</h2>

          <SimulationSummaryCards result={result} />

          <ProjectionChart result={result} />

          <ProjectionTable result={result} />

          <BudgetImpactTable result={result} />

          <GoalsImpactCards result={result} />
        </div>
      )}
    </div>
  );
}
