import { getSubscription } from './getSubscription';
import { cancel } from './cancel';
import { renew } from './renew';
import { createCheckoutSession } from './createCheckoutSession';
import { createPortalSession } from './createPortalSession';

export const subscriptionsService = {
  getSubscription,
  cancel,
  renew,
  createCheckoutSession,
  createPortalSession,
};
