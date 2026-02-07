import { create } from './create';
import { createOperation } from './createOperation';
import { getAll } from './getAll';
import { getOperations } from './getOperations';
import { remove } from './remove';
import { update } from './update';

export const goalsService = {
  getAll,
  create,
  update,
  remove,
  createOperation,
  getOperations,
};
