import { GoalOperation } from '@/app/entities/GoalOperation';
import { httpClient } from '../httpClient';

export interface CreateOperationParams {
  goalId: string;
  type: GoalOperation['type'];
  value: number;
  bankAccountId: string;
  description?: string;
}

export async function createOperation({ goalId, ...params }: CreateOperationParams) {
  const { data } = await httpClient.post<GoalOperation>(`/goals/${goalId}/operations`, params);

  return data;
}
