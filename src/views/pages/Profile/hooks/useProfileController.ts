import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/app/hooks/useToast';
import { authService } from '@/app/services/authService';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z
      .string()
      .min(1, 'Nova senha é obrigatória')
      .min(8, 'A nova senha deve ter pelo menos 8 caracteres'),
    confirmNewPassword: z.string().min(1, 'Confirme a nova senha'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmNewPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export function useProfileController(onPasswordSuccess?: () => void) {
  const { toast } = useToast();

  const changePasswordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      authService.updatePassword(data),
    mutationKey: ['updatePassword'],
  });

  const handleChangePassword = changePasswordForm.handleSubmit(async (data) => {
    try {
      await updatePasswordMutation.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast({ title: 'Sucesso', description: 'Senha alterada com sucesso.' });
      changePasswordForm.reset();
      onPasswordSuccess?.();
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível alterar a senha. Verifique a senha atual.',
      });
    }
  });

  return {
    changePasswordForm,
    handleChangePassword,
    isChangingPassword: updatePasswordMutation.isPending,
  };
}
