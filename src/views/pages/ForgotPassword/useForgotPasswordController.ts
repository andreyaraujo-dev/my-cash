import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/app/services/authService';
import { useToast } from '@/app/hooks/useToast';

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
});

type FormData = z.infer<typeof schema>;

export function useForgotPasswordController() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: authService.forgotPassword,
    mutationKey: ['forgotPassword'],
  });

  const { toast } = useToast();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({ email: data.email });
      setIsEmailSent(true);
    } catch {
      toast({
        title: 'Erro',
        description: 'Não foi possível enviar o e-mail. Tente novamente.',
      });
    }
  });

  return { handleSubmit, register, errors, isPending, isEmailSent };
}
