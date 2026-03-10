import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/app/services/authService';
import { useToast } from '@/app/hooks/useToast.ts';
import { SigninParams } from '@/app/services/authService/signin.ts';
import { useAuth } from '@/app/hooks/useAuth.ts';
import { localStorageKeys } from '@/app/config/localStorageKeys.ts';
import { getDeviceFingerprint } from '@/app/utils/getDeviceFingerprint.ts';
import { useCallback, useState } from 'react';
import { getApiErrorMessage } from '@/app/utils/getApiErrorMessage.ts';

const schema = z.object({
  email: z.string().nonempty('E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z
    .string()
    .nonempty('Senha é obrigatória')
    .min(8, 'Senha deve conter pelo menos 8 dígitos'),
});

type FormData = z.infer<typeof schema>;

const mfaSchema = z.object({
  token: z
    .string()
    .nonempty('Código MFA é obrigatório')
    .regex(/^\d{6}$/, 'Informe o código de 6 dígitos'),
});

type MfaFormData = z.infer<typeof mfaSchema>;

export function useLoginController() {
  const {
    handleSubmit: hookFormSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {
    handleSubmit: hookFormSubmitMfa,
    control: mfaControl,
    reset: resetMfaForm,
    formState: { errors: mfaErrors },
  } = useForm<MfaFormData>({
    resolver: zodResolver(mfaSchema),
    defaultValues: {
      token: '',
    },
  });

  const [mfaTempToken, setMfaTempToken] = useState(
    () => localStorage.getItem(localStorageKeys.MFA_TEMP_TOKEN) ?? '',
  );
  const [isMfaModalOpen, setIsMfaModalOpen] = useState(() => {
    return !!localStorage.getItem(localStorageKeys.MFA_TEMP_TOKEN);
  });
  const [trustDevice, setTrustDevice] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: SigninParams) => {
      return authService.signin(data);
    },
    mutationKey: ['signin'],
  });

  const { mutateAsync: mutateVerifyMfaAsync, isPending: isVerifyingMfa } = useMutation({
    mutationFn: authService.mfaVerify,
    mutationKey: ['verifyMfa'],
  });

  const { toast } = useToast();

  const { signin } = useAuth();

  const clearMfaChallenge = useCallback(() => {
    localStorage.removeItem(localStorageKeys.MFA_TEMP_TOKEN);
    setMfaTempToken('');
    setIsMfaModalOpen(false);
    setTrustDevice(false);
    resetMfaForm();
  }, [resetMfaForm]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      const response = await mutateAsync(data);

      if ('accessToken' in response) {
        clearMfaChallenge();
        signin(response.accessToken);
        return;
      }

      localStorage.setItem(localStorageKeys.MFA_TEMP_TOKEN, response.mfaTempToken);
      setMfaTempToken(response.mfaTempToken);
      setIsMfaModalOpen(true);
      setTrustDevice(false);
      resetMfaForm();
    } catch (error) {
      toast({
        title: 'Erro',
        description: getApiErrorMessage(error) ?? 'Credenciais inválidas, tente novamente.',
      });
    }
  });

  const handleMfaSubmit = hookFormSubmitMfa(async ({ token }) => {
    const currentMfaTempToken =
      mfaTempToken || localStorage.getItem(localStorageKeys.MFA_TEMP_TOKEN) || '';

    if (!currentMfaTempToken) {
      toast({
        variant: 'destructive',
        title: 'Sessão MFA expirada',
        description: 'Faça login novamente para continuar.',
      });
      return;
    }

    try {
      const { accessToken } = await mutateVerifyMfaAsync({
        mfaTempToken: currentMfaTempToken,
        token,
        trustDevice,
        deviceFingerprint: trustDevice ? getDeviceFingerprint() : undefined,
      });

      clearMfaChallenge();
      signin(accessToken);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Código inválido',
        description:
          getApiErrorMessage(error) ?? 'Não foi possível validar o MFA. Tente novamente.',
      });
    }
  });

  const handleMfaModalOpenChange = (open: boolean) => {
    if (!open) {
      clearMfaChallenge();
      return;
    }

    setIsMfaModalOpen(true);
  };

  return {
    handleSubmit,
    register,
    errors,
    isPending,
    isMfaModalOpen,
    handleMfaModalOpenChange,
    handleMfaSubmit,
    mfaControl,
    mfaErrors,
    trustDevice,
    setTrustDevice,
    isVerifyingMfa,
  };
}
