import { Goal } from '@/app/entities/Goal';
import { httpClient } from '../httpClient';

export interface UpdateGoalParams {
  id: string;
  name: string;
  targetValue: number;
  currentValue: number;
  dueDate: string;
  status: Goal['status'];
  categoryId: string;
  importance: Goal['importance'];
  priority: Goal['priority'];
  description?: string;
}

export async function update({ id, ...params }: UpdateGoalParams) {
  const { data } = await httpClient.put<Goal>(`/goals/${id}`, params);

  return data;
}
