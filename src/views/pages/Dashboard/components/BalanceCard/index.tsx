import { Button } from '@/views/components/ui/button';
import { Card } from '@/views/components/ui/card';
import { Eye, EyeOff, TrendingUp } from 'lucide-react';
import { InfoAccountsTooltip } from '../Accounts/InfoAccountsTooltip';
import { useAccountsController } from '../Accounts/useAccountsController';
import { formatCurrency } from '@/app/utils/formatCurrency';
// import { EyeIcon } from '@/views/components/icons/EyeIcon';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/views/components/ui/skeleton';

export function BalanceCard() {
  const { currentBalance, toggleValuesVisibility, areValuesVisible, isLoading } =
    useAccountsController();

  if (isLoading) {
    return (
      <Card className="p-6 bg-card/50 border border-border">
        <div className="flex items-start justify-between mb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-6" />
        </div>
        <Skeleton className="h-8 w-40" />
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card/50 border border-border">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <h2 className="text-sm text-muted-foreground">Saldo total</h2>
          <InfoAccountsTooltip />
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
          <TrendingUp size={16} />
        </Button>
      </div>

      <div className="flex">
        <strong
          className={cn('text-2xl tracking-[-1px', !areValuesVisible && 'blur-md select-none')}
        >
          {formatCurrency(currentBalance)}
        </strong>
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center"
          onClick={toggleValuesVisibility}
        >
          {!areValuesVisible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>
    </Card>
  );
}
