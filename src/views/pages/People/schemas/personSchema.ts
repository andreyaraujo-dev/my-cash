import { z } from 'zod';
import { SharedAccessLevel } from '@/app/entities/Person';

export const createPersonSchema = z.object({
  name: z
    .string()
    .nonempty('Nome é obrigatório')
    .max(255, 'Nome deve ter no máximo 255 caracteres'),
  email: z.string().nonempty('E-mail é obrigatório').email('E-mail inválido'),
  accessLevel: z.nativeEnum(SharedAccessLevel, {
    required_error: 'Nível de acesso é obrigatório',
  }),
});

export const updatePersonSchema = z.object({
  accessLevel: z.nativeEnum(SharedAccessLevel, {
    required_error: 'Nível de acesso é obrigatório',
  }),
});

export type CreatePersonSchema = z.infer<typeof createPersonSchema>;
export type UpdatePersonSchema = z.infer<typeof updatePersonSchema>;
