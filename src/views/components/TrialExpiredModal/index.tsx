import { Crown, Sparkles, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/views/components/ui/dialog';
import { Button } from '@/views/components/ui/button';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { formatDate } from '@/app/utils/formatDate';

interface TrialExpiredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade: () => void;
  trialEndsAt?: string | null;
  planValue?: number;
}

export function TrialExpiredModal({
  open,
  onOpenChange,
  onUpgrade,
  trialEndsAt,
  planValue,
}: TrialExpiredModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl max-w-[90%] md:max-w-md bg-background border border-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-500/15 flex items-center justify-center">
              <Crown className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <DialogTitle>Seu período grátis terminou</DialogTitle>
              <p className="text-sm text-muted-foreground">Ative o plano para continuar usando tudo.</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {trialEndsAt && (
            <p className="text-sm text-muted-foreground">
              Trial finalizado em {formatDate(new Date(trialEndsAt))}.
            </p>
          )}

          <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Acesso completo às transações, contas, categorias e metas.</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Relatórios e histórico liberados sem limitações.</span>
            </div>
          </div>

          {typeof planValue === 'number' && (
            <p className="text-sm text-muted-foreground">
              Plano atual: <strong className="text-foreground">{formatCurrency(planValue)}/mês</strong>
            </p>
          )}

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" onClick={onUpgrade}>
              Assinar agora
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Continuar com acesso limitado
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
