import { httpClient } from '../httpClient';

export async function remove(goalId: string) {
  await httpClient.delete(`/goals/${goalId}`);
}
