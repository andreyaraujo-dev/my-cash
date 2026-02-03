import { GoalOperation } from '@/app/entities/GoalOperation';
import { httpClient } from '../httpClient';

type OperationsResponse = Array<GoalOperation>;

export async function getOperations(goalId: string) {
  const { data } = await httpClient.get<OperationsResponse>(`/goals/${goalId}/operations`);

  return data;
}
