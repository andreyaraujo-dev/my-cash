import { transactionsService } from '@/app/services/transactionsService';

export async function updateTransactionStatusAction(id: string) {
  return transactionsService.updateStatus(id);
}
