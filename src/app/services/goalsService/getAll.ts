import { Goal } from '@/app/entities/Goal';
import { httpClient } from '@/app/services/httpClient';

type GoalsResponse = Array<Goal>;

export type GoalsFilters = {
  name?: string;
  dueDate?: string;
  status?: Goal['status'];
  categoryId?: string;
  importance?: Goal['importance'];
  priority?: Goal['priority'];
};

export async function getAll(filters: GoalsFilters) {
  const { data } = await httpClient.get<GoalsResponse>('/goals', {
    params: filters,
  });

  return data;
}
