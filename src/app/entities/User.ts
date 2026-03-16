import { SharedAccessLevel } from './Person';

export interface User {
  name: string;
  email: string;
  isMfaEnabled?: boolean;
  sharedAccessLevel?: SharedAccessLevel | null;
  isAccountOwner?: boolean;
}
