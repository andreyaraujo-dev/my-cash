import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/app/hooks/useToast';
import { useBankAccounts } from '@/app/hooks/useBankAccounts';
import { useCategories } from '@/app/hooks/useCategories';
import { useSimulate } from '@/app/hooks/useSimulate';
import { transactionsService } from '@/app/services/transactionsService';
import { getApiErrorMessage } from '@/app/utils/getApiErrorMessage';
import { simulateSchema, type SimulateFormInput } from '../schemas/simulate-schema';
import type { SimulateParams } from '@/app/entities/Simulation';

export function useSimulationsController() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { accounts } = useBankAccounts();
  const { categories } = useCategories();
  const [paramsToSimulate, setParamsToSimulate] = useState<SimulateParams | null>(null);
  const { data: result, isFetching: isPending } = useSimulate(paramsToSimulate);

  const form = useForm<SimulateFormInput>({
    resolver: zodResolver(simulateSchema),
    defaultValues: {
      period: '12',
      type: 'INCOME',
      value: '0',
      date: new Date(),
      bankAccountId: '',
      categoryId: '',
      parcels: undefined,
      entrada: undefined,
      juros: undefined,
      recurrenceGroupId: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formData) => {
    let params: SimulateParams;
    try {
      const data = simulateSchema.parse(formData);
      params = {
        period: data.period as 12 | 24 | 60,
        type: data.type,
        value: data.value,
        date: data.date.toISOString().split('T')[0],
        ...(data.bankAccountId && { bankAccountId: data.bankAccountId }),
        ...(data.categoryId && { categoryId: data.categoryId }),
        ...(data.parcels != null && { parcels: data.parcels }),
        ...(data.entrada != null && data.entrada > 0 && { entrada: data.entrada }),
        ...(data.juros != null && { juros: data.juros }),
        ...(data.recurrenceGroupId && { recurrenceGroupId: data.recurrenceGroupId }),
      };
    } catch {
      toast({
        title: 'Erro na validação',
        description: 'Verifique os dados informados e tente novamente.',
        duration: 3000,
      });
      return;
    }

    setParamsToSimulate(params);
    try {
      await queryClient.fetchQuery({
        queryKey: ['simulate', params],
        queryFn: () => transactionsService.simulate(params),
      });
      toast({
        title: 'Simulação concluída',
        description: 'Os resultados foram calculados com sucesso.',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Erro na simulação',
        description:
          getApiErrorMessage(error) ?? 'Não foi possível realizar a simulação. Tente novamente.',
        duration: 3000,
      });
    }
  });

  const accountsOptions = useMemo(
    () =>
      accounts.map((account) => ({
        value: account.id,
        label: account.name,
      })),
    [accounts],
  );

  const type = form.watch('type');
  const categoriesOptions = useMemo(
    () =>
      categories
        .filter((category) => category.type === type)
        .map((category) => ({
          value: category.id,
          label: category.name,
        })),
    [categories, type],
  );

  return {
    form,
    handleSubmit,
    result,
    isPending,
    accountsOptions,
    categoriesOptions,
  };
}
