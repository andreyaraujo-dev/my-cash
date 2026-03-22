import { z } from 'zod';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';

const currencySchema = z
  .union([z.string(), z.number()])
  .transform((val) => {
    if (typeof val === 'number') return val;
    if (!val || val === '0' || val === '0,00') return 0;
    return currencyStringToNumber(val);
  })
  .refine((val) => val > 0, 'Informe um valor positivo');

const optionalCurrencySchema = z
  .union([z.string(), z.number()])
  .optional()
  .or(z.literal(''))
  .transform((val) => {
    if (val === undefined || val === '' || val === null) return undefined;
    if (typeof val === 'number') return val;
    if (val === '0' || val === '0,00') return 0;
    return currencyStringToNumber(val);
  });

export const simulateSchema = z.object({
  period: z
    .union([z.enum(['12', '24', '60']), z.number()])
    .transform((val) => (typeof val === 'number' ? val : Number(val)) as 12 | 24 | 60)
    .refine((val) => [12, 24, 60].includes(val), 'Período deve ser 12, 24 ou 60 meses')
    .default(12),
  type: z.enum(['INCOME', 'EXPENSE']),
  value: currencySchema,
  date: z.date({ required_error: 'Informe a data de início' }),
  bankAccountId: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform((val) => (val && val !== '' ? val : undefined)),
  categoryId: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform((val) => (val && val !== '' ? val : undefined)),
  parcels: z.number().optional(),
  entrada: optionalCurrencySchema,
  juros: z.number().min(0, 'Taxa deve ser >= 0').optional(),
  recurrenceGroupId: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform((val) => (val && val !== '' ? val : undefined)),
});

export type SimulateSchema = z.infer<typeof simulateSchema>;
export type SimulateFormInput = z.input<typeof simulateSchema>;
