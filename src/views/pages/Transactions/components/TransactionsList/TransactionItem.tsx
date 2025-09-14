import { Transaction } from '@/app/entities/Transaction';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { Avatar, AvatarFallback } from '@/views/components/ui/avatar';
import { Button } from '@/views/components/ui/button';
import { format } from 'date-fns';
import { Check, Clock } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
  onTogglePaid: () => void;
}

export function TransactionItem({
  transaction: { type, date, name, value, isPaid },
  onTogglePaid,
}: TransactionItemProps) {
  const amountColor = type === 'INCOME' ? 'text-green-500' : 'text-red-500';
  const prefix = type === 'INCOME' ? '+' : '-';

  // Gerar iniciais do título para o avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={`flex items-center justify-between py-3 px-1 hover:bg-muted/30 rounded-lg transition-colors ${
        isPaid ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          {type === 'EXPENSE' && (
            <Button
              variant="outline"
              size="icon"
              className={`h-5 w-5 absolute -bottom-1 -right-1 border-2 ${
                isPaid
                  ? 'bg-green-500 border-green-500 text-white hover:bg-green-600'
                  : 'bg-background border-muted-foreground text-muted-foreground hover:bg-muted'
              }`}
              onClick={onTogglePaid}
            >
              {isPaid ? <Check size={10} /> : <Clock size={10} />}
            </Button>
          )}
        </div>

        <div>
          <h4 className={`font-medium ${!isPaid ? 'text-foreground' : 'text-muted-foreground'}`}>
            {name}
          </h4>
          <p className="text-sm text-muted-foreground">{format(date, 'dd/MM/yyyy')}</p>
        </div>
      </div>

      <div className="text-right">
        <p className={`font-semibold ${amountColor} ${isPaid ? 'opacity-60' : ''}`}>
          {prefix} {formatCurrency(value)}
        </p>
        {type === 'EXPENSE' && (
          <p className="text-xs text-muted-foreground">{isPaid ? 'Pago' : 'Pendente'}</p>
        )}
      </div>
    </div>
  );
}
