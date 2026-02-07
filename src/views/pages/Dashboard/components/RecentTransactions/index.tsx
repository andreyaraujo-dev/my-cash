import { useTransactions } from '@/app/hooks/useTransactions';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { Avatar, AvatarFallback } from '@/views/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/views/components/ui/card';
import { Skeleton } from '@/views/components/ui/skeleton';
import { format } from 'date-fns';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function RecentTransactions() {
  // Obtém o mês e ano atual
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const { transactions, isLoading } = useTransactions({
    month,
    year,
  });

  // Pega apenas as 5 últimas transações
  const recentTransactions = transactions.slice(0, 5);

  // Gerar iniciais do título para o avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <Skeleton className="h-5 w-24" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {recentTransactions.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p>Nenhuma transação encontrada neste mês</p>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              {recentTransactions.map((transaction) => {
                const amountColor =
                  transaction.type === 'INCOME' ? 'text-green-500' : 'text-red-500';
                const prefix = transaction.type === 'INCOME' ? '+' : '-';

                return (
                  <div
                    key={transaction.id}
                    className={`flex items-center justify-between py-3 px-1 hover:bg-muted/30 rounded-lg transition-colors ${
                      transaction.isPaid ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                            {getInitials(transaction.name)}
                          </AvatarFallback>
                        </Avatar>
                        {transaction.type === 'EXPENSE' && (
                          <div
                            className={`h-5 w-5 absolute -bottom-1 -right-1 border-2 rounded-full flex items-center justify-center ${
                              transaction.isPaid
                                ? 'bg-green-500 border-green-500 text-white'
                                : 'bg-background border-muted-foreground text-muted-foreground'
                            }`}
                          >
                            {transaction.isPaid ? <Check size={10} /> : <Clock size={10} />}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <p
                          className={`font-medium text-left ${!transaction.isPaid ? 'text-foreground' : 'text-muted-foreground'}`}
                        >
                          {transaction.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(transaction.date), 'dd/MM/yyyy')}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`font-semibold ${amountColor} ${transaction.isPaid ? 'opacity-60' : ''}`}
                      >
                        {prefix} {formatCurrency(transaction.value)}
                      </p>
                      {transaction.type === 'EXPENSE' && (
                        <p className="text-xs text-muted-foreground">
                          {transaction.isPaid ? 'Pago' : 'Pendente'}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <Link
          to="/transactions"
          className="flex items-center justify-center gap-2 mt-4 py-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
        >
          Ver todas as transações
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </CardContent>
    </Card>
  );
}
