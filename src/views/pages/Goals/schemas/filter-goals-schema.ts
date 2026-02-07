import { z } from 'zod';

export const filterGoalsSchema = z.object({
  name: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  categoryId: z.string().optional(),
  importance: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
});

export type FilterGoalsSchema = z.infer<typeof filterGoalsSchema>;
