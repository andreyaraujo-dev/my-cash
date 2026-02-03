import { z } from 'zod';

export const createGoalSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  value: z.union([z.string(), z.number()]).transform((val, ctx) => {
    if (val === 0 || val === '0' || val === '0,00') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A meta precisa ter um valor',
      });
      return z.NEVER;
    }
    return val;
  }),
  dueDate: z
    .date({ required_error: 'Data de vencimento é obrigatória' })
    .nullable()
    .refine((date) => date !== null && date !== undefined, {
      message: 'Data de vencimento é obrigatória',
    }),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], {
    required_error: 'Status é obrigatório',
  }),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  importance: z.enum(['LOW', 'MEDIUM', 'HIGH'], {
    required_error: 'Importância é obrigatória',
  }),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'], {
    required_error: 'Prioridade é obrigatória',
  }),
  description: z.string().optional(),
});

export type CreateGoalSchema = z.infer<typeof createGoalSchema>;
