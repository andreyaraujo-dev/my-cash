import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authService } from '@/app/services/authService';
import { useMutation } from '@tanstack/react-query';
import { SignupParams } from '@/app/services/authService/signup.ts';
import { useToast } from '@/app/hooks/useToast.ts';
import { useAuth } from '@/app/hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  name: z.string().nonempty('Nome é obrigatório'),
  email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z
    .string()
    .nonempty('Senha é obrigatória')
    .min(8, 'Senha deve conter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data);
    },
    mutationKey: ['signup'],
  });

  const { toast } = useToast();

  const { signin } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      signin(accessToken);

      navigate('/welcome', { replace: true });

      toast({ title: 'Sucesso', description: 'Cadastro realizado com sucesso!' });
    } catch {
      toast({ title: 'Erro', description: 'Não foi possível realizar o cadastro.' });
    }
  });

  return { handleSubmit, register, errors, isPending };
}
