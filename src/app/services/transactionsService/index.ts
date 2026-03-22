import { getAll } from './getAll';
import { create } from './create';
import { update } from './update';
import { remove } from './remove';
import { updateStatus } from './update-status';
import { updateRecurring } from './update-recurring';
import { removeRecurring } from './remove-recurring';
import { exportTransactions } from './export';
import { simulate } from './simulate';

export const transactionsService = {
  getAll,
  create,
  update,
  remove,
  updateStatus,
  updateRecurring,
  removeRecurring,
  export: exportTransactions,
  simulate,
};
