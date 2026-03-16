import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { peopleService } from '@/app/services/peopleService';
import { useToast } from '@/app/hooks/useToast';
import { getApiErrorMessage } from '@/app/utils/getApiErrorMessage';

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

export function useActivateAccountController() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    data: inviteData,
    isError: isTokenInvalid,
    isLoading: isValidatingToken,
  } = useQuery({
    queryKey: ['people', 'validateToken', token],
    queryFn: () => peopleService.validateToken(token!),
    enabled: !!token,
    retry: false,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: peopleService.activateAccount,
    mutationKey: ['people', 'activateAccount'],
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!token) return;

    try {
      await mutateAsync({ token, newPassword: data.newPassword });
      toast({
        title: 'Conta ativada!',
        description: 'Conta ativada com sucesso. Faça login para acessar.',
      });
      navigate('/login', { replace: true });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description:
          getApiErrorMessage(error) ?? 'Não foi possível ativar a conta. O link pode ter expirado.',
      });
    }
  });

  return {
    token: !!token,
    inviteData,
    isTokenInvalid,
    isValidatingToken,
    form,
    handleSubmit,
    isPending,
  };
}
