import { httpClient } from '../httpClient';

interface RemoveGoalParams {
  goalId: string;
  deleteTransactions?: boolean;
}

export async function remove({ goalId, deleteTransactions }: RemoveGoalParams) {
  await httpClient.delete(`/goals/${goalId}`, {
    data: { deleteTransactions },
  });
}
