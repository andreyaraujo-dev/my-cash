export type SubscriptionPlan = 'BASIC' | 'PREMIUM';

export interface Subscription {
  id: string;
  userId: string;
  isActive: boolean;
  cancelRequestedAt: string | null;
  value: number;
  startDate: string;
  nextRenewalAt: string;
  reactivatedAt: string | null;
  isTrial: boolean;
  trialEndsAt: string | null;
  plan?: SubscriptionPlan;
  createdAt: string;
  updatedAt: string;
}
