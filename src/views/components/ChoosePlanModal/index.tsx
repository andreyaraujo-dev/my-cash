import { CheckCircle2, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/views/components/ui/dialog';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { usePlans } from '@/app/hooks/usePlans';
import type { Plan } from '@/app/entities/Plan';

interface ChoosePlanModalProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectPlan: (plan: Plan) => void;
  isLoading?: boolean;
}

export function ChoosePlanModal({
  open,
  onOpenChange,
  onSelectPlan,
  isLoading = false,
}: ChoosePlanModalProps) {
  const { plans, isLoading: isPlansLoading } = usePlans();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="rounded-2xl max-w-[90%] md:max-w-lg bg-background border border-border"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Escolha seu plano</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Selecione o plano que melhor atende às suas necessidades.
          </p>
        </DialogHeader>

        <div className="grid gap-3 sm:grid-cols-2">
          {isPlansLoading ? (
            <div className="col-span-2 py-8 text-center text-sm text-muted-foreground">
              Carregando planos...
            </div>
          ) : (
            plans.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => onSelectPlan(plan)}
                disabled={isLoading}
                className="flex flex-col items-start gap-2 rounded-xl border border-border bg-muted/30 p-4 text-left transition-colors hover:bg-muted/50 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-semibold">{plan.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                {(plan?.benefits?.length ?? 0) > 0 && (
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {(plan.benefits ?? []).map((benefit) => (
                      <li key={benefit} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="text-lg font-bold mt-auto">{formatCurrency(plan.price)}/mês</p>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
