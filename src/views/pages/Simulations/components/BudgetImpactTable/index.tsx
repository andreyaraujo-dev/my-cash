import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/views/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/views/components/ui/card';
import { formatCurrency } from '@/app/utils/formatCurrency';
import { MONTHS } from '@/app/config/constants';
import type { SimulateResponse } from '@/app/entities/Simulation';

interface BudgetImpactTableProps {
  result: SimulateResponse;
}

export function BudgetImpactTable({ result }: BudgetImpactTableProps) {
  const { budgetImpact } = result;

  if (!budgetImpact || budgetImpact.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Impacto em orçamentos</CardTitle>
          <p className="text-sm text-muted-foreground">
            Nenhuma categoria estourou o orçamento com a simulação.
          </p>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Impacto em orçamentos</CardTitle>
        <p className="text-sm text-muted-foreground">
          Categorias que estouraram o orçamento após a simulação.
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead>Mês/Ano</TableHead>
                <TableHead className="text-right">Gasto</TableHead>
                <TableHead className="text-right">Orçamento</TableHead>
                <TableHead className="text-right">Excedente</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgetImpact.flatMap((item) =>
                item.monthsOverBudget.map((month) => (
                  <TableRow key={`${item.categoryId}-${month.year}-${month.month}`}>
                    <TableCell className="font-medium">{item.categoryName}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {MONTHS[month.month - 1]}/{month.year}
                    </TableCell>
                    <TableCell className="text-right text-red-600 dark:text-red-400">
                      {formatCurrency(month.spending)}
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(month.budget)}</TableCell>
                    <TableCell className="text-right font-medium text-red-600 dark:text-red-400">
                      {formatCurrency(month.spending - month.budget)}
                    </TableCell>
                  </TableRow>
                )),
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
