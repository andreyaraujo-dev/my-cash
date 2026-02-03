import { z } from 'zod';

export const goalOperationSchema = z.object({
  type: z.enum(['DEPOSIT', 'WITHDRAW'], {
    required_error: 'Tipo de operação é obrigatório',
  }),
  value: z.number({ required_error: 'Valor é obrigatório' }).positive('O valor deve ser positivo'),
  bankAccountId: z.string().min(1, 'Conta bancária é obrigatória'),
  description: z.string().optional(),
});

export type GoalOperationSchema = z.infer<typeof goalOperationSchema>;
