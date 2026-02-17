export interface Notification {
  id: string;
  userId: string | null;
  type: string;
  channel: string;
  title: string;
  message: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  read: boolean;
  readAt: string | null;
}
