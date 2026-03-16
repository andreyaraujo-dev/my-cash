import { getAll } from './getAll';
import { create } from './create';
import { update } from './update';
import { remove } from './remove';
import { getAccessHistory } from './getAccessHistory';
import { validateToken } from './validateToken';
import { activateAccount } from './activateAccount';

export const peopleService = {
  getAll,
  create,
  update,
  remove,
  getAccessHistory,
  validateToken,
  activateAccount,
};
