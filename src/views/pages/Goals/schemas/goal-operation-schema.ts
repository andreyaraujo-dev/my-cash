import { z } from 'zod';
import { currencyStringToNumber } from '@/app/utils/currencyStringToNumber';

export const goalOperationSchema = z.object({
  type: z.enum(['DEPOSIT', 'WITHDRAW'], {
    required_error: 'Tipo de operação é obrigatório',
  }),
  value: z
    .union([z.string().min(1, 'Valor é obrigatório'), z.number()])
    .transform((val) => (typeof val === 'string' ? currencyStringToNumber(val) : val))
    .refine((num) => num > 0, 'O valor deve ser positivo'),
  bankAccountId: z.string().min(1, 'Conta bancária é obrigatória'),
  description: z.string().optional(),
});

export type GoalOperationSchema = z.infer<typeof goalOperationSchema>;
