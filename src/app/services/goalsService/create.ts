import { Goal } from '@/app/entities/Goal';
import { httpClient } from '../httpClient';

export interface CreateGoalParams {
  name: string;
  value: number;
  dueDate: string;
  status: Goal['status'];
  categoryId: string;
  importance: Goal['importance'];
  priority: Goal['priority'];
  description?: string;
}

export async function create(params: CreateGoalParams) {
  const { data } = await httpClient.post<Goal>('/goals', params);

  return data;
}
