import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  type: z.enum(['INCOME', 'EXPENSE'], { message: 'Tipo é obrigatório' }),
  icon: z.string().nonempty('Ícone é obrigatório'),
  budget: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (!val || val === '' || val === '0' || val === '0,00') {
        return undefined;
      }
      return val;
    }),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;
