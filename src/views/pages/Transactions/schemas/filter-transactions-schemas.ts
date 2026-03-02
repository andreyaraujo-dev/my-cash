import { z } from 'zod';

export const filterTransactionsSchema = z.object({
  name: z.string().optional(),
  month: z.number().optional(),
  year: z.number().optional(),
  isPaid: z.string().optional(),
  type: z.enum(['INCOME', 'EXPENSE', 'ALL']).optional(),
});

export type FilterTransactionsSchema = z.infer<typeof filterTransactionsSchema>;
