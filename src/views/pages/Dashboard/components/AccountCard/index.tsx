import { BankAccount } from '@/app/entities/BankAccount';
import { useDashboard } from '@/app/hooks/useDashboard';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { Button } from '@/views/components/ui/button';
import { Card } from '@/views/components/ui/card';
import { cn } from '@/lib/utils';
import { MoreHorizontal } from 'lucide-react';

interface AccountCardProps {
  data: BankAccount;
}

export function AccountCard({ data }: AccountCardProps) {
  const { name, color, currentBalance } = data;
  const { openEditAccountModal, areValuesVisible } = useDashboard();

  return (
    <Card className={`p-6 bg-card/50 border-2 min-w-[200px]`} style={{ borderColor: color }}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-muted-foreground rounded" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground"
          onClick={() => openEditAccountModal(data)}
        >
          <MoreHorizontal size={16} />
        </Button>
      </div>

      <div className="space-y-1">
        <h3 className="font-medium text-foreground">{name}</h3>
        <p
          className={cn(
            'text-2xl font-semibold text-foreground',
            !areValuesVisible && 'blur-md select-none',
          )}
        >
          {formatCurrency(currentBalance)}
        </p>
        <p className="text-sm text-muted-foreground">Saldo atual</p>
      </div>
    </Card>
  );
}
