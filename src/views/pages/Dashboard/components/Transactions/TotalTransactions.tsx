import { formatCurrency } from '@/app/utils/formatCurrency.ts';
import { cn } from '@/lib/utils.ts';

interface TotalTransactionsProps {
  filtersType: 'EXPENSE' | 'INCOME' | undefined;
  areValuesVisible: boolean;
  totalIncome: number;
  totalExpense: number;
}

export function TotalTransactions({
  filtersType,
  areValuesVisible,
  totalExpense,
  totalIncome,
}: TotalTransactionsProps) {
  return (
    <div className="p-2 flex items-center justify-start md:justify-end gap-2 border-t border-zinc-700">
      {!filtersType ? (
        <div
          className={cn(
            'flex items-center justify-between gap-1 w-full',
            !areValuesVisible && 'blur-sm select-none',
          )}
        >
          <div className="w-max text-xs items-center font-medium text-teal-900 flex gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>{formatCurrency(totalIncome)}</span>
          </div>
          <div className="w-max text-xs items-center font-medium text-red-900 flex gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>{formatCurrency(totalExpense)}</span>
          </div>
        </div>
      ) : filtersType === 'EXPENSE' ? (
        <div
          className={cn(
            'w-max text-xs items-center font-medium text-red-900 flex gap-1',
            !areValuesVisible && 'blur-sm ',
          )}
        >
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>{formatCurrency(totalExpense)}</span>
        </div>
      ) : (
        <div
          className={cn(
            'w-max text-xs items-center font-medium text-teal-900 flex gap-1',
            !areValuesVisible && 'blur-sm select-none',
          )}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>{formatCurrency(totalIncome)}</span>
        </div>
      )}
    </div>
  );
}
