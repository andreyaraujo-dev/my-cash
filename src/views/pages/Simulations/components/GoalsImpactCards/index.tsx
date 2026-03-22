import { Card, CardContent, CardHeader, CardTitle } from '@/views/components/ui/card';
import { Target } from 'lucide-react';
import type { SimulateResponse } from '@/app/entities/Simulation';

interface GoalsImpactCardsProps {
  result: SimulateResponse;
}

export function GoalsImpactCards({ result }: GoalsImpactCardsProps) {
  const { goalsImpact } = result;

  if (!goalsImpact || goalsImpact.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Impacto nas metas</CardTitle>
          <p className="text-sm text-muted-foreground">Nenhuma meta foi afetada pela simulação.</p>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Impacto nas metas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goalsImpact.map((goal) => (
          <Card key={goal.goalId}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <CardTitle className="text-base">{goal.goalName}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              {goal.newEstimatedDueDate && (
                <p className="text-sm text-muted-foreground">
                  Nova data estimada:{' '}
                  {new Date(goal.newEstimatedDueDate).toLocaleDateString('pt-BR')}
                </p>
              )}
              {goal.impactOnTarget && (
                <p className="text-sm font-medium text-primary">{goal.impactOnTarget}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
