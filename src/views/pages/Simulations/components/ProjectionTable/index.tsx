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

interface ProjectionTableProps {
  result: SimulateResponse;
}

function formatMonthYear(month: number, year: number) {
  return `${MONTHS[month - 1]}/${year}`;
}

export function ProjectionTable({ result }: ProjectionTableProps) {
  const { baseProjection, simulatedProjection } = result;

  const rows = baseProjection.map((base, i) => {
    const sim = simulatedProjection[i];
    return {
      month: base.month,
      year: base.year,
      label: formatMonthYear(base.month, base.year),
      baseBalance: base.balance,
      simBalance: sim?.balance ?? 0,
      baseIncome: base.income,
      baseExpense: base.expense,
      simulatedDelta: sim?.simulatedDelta ?? 0,
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projeção mês a mês</CardTitle>
        <p className="text-sm text-muted-foreground">
          Comparação entre a projeção base e a projeção com a simulação aplicada.
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mês/Ano</TableHead>
                <TableHead className="text-right">Saldo base</TableHead>
                <TableHead className="text-right">Saldo simulado</TableHead>
                <TableHead className="text-right">Valor simulado</TableHead>
                <TableHead className="text-right">Receita</TableHead>
                <TableHead className="text-right">Despesa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={`${row.year}-${row.month}`}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(row.baseBalance)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      row.simBalance > 0
                        ? 'text-green-600 dark:text-green-400'
                        : row.simBalance < 0
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {formatCurrency(row.simBalance)}
                  </TableCell>
                  <TableCell
                    className={`text-right font-medium ${
                      row.simulatedDelta > 0
                        ? 'text-green-600 dark:text-green-400'
                        : row.simulatedDelta < 0
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-muted-foreground'
                    }`}
                  >
                    {row.simulatedDelta !== 0
                      ? `${row.simulatedDelta > 0 ? '+' : ''}${formatCurrency(row.simulatedDelta)}`
                      : '-'}
                  </TableCell>
                  <TableCell className="text-right text-green-600 dark:text-green-400">
                    {formatCurrency(row.baseIncome)}
                  </TableCell>
                  <TableCell className="text-right text-red-600 dark:text-red-400">
                    {formatCurrency(row.baseExpense)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
