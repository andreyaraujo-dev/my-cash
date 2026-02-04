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
  createdAt: string;
  updatedAt: string;
}
