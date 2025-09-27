import { getAll } from './getAll';
import { create } from './create';
import { update } from './update';
import { remove } from './remove';
import { updateStatus } from './update-status';

export const transactionsService = {
  getAll,
  create,
  update,
  remove,
  updateStatus,
};
