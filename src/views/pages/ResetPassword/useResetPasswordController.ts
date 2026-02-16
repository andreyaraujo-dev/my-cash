import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '@/app/services/authService';
import { useToast } from '@/app/hooks/useToast';

const schema = z
  .object({
    newPassword: z
      .string({ required_error: 'Senha é obrigatória' })
      .nonempty('Senha é obrigatória')
      .min(8, 'Senha deve conter pelo menos 8 caracteres'),
    confirmNewPassword: z
      .string({ required_error: 'Confirmação de senha é obrigatória' })
      .nonempty('Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmNewPassword'],
  });

type FormData = z.infer<typeof schema>;

export function useResetPasswordController() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: authService.resetPassword,
    mutationKey: ['resetPassword'],
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    if (!token) return;

    try {
      await mutateAsync({ token, newPassword: data.newPassword });
      toast({
        title: 'Senha redefinida!',
        description: 'Sua senha foi alterada com sucesso. Faça login com a nova senha.',
      });
      navigate('/login', { replace: true });
    } catch {
      toast({
        title: 'Erro',
        description: 'Não foi possível redefinir a senha. O link pode ter expirado.',
      });
    }
  });

  return { handleSubmit, register, errors, isPending, hasToken: !!token };
}
