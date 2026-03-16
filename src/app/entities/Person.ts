/* eslint-disable no-unused-vars */
export enum SharedAccessLevel {
  READ_ONLY = 'READ_ONLY',
  READ_WRITE = 'READ_WRITE',
  READ_WRITE_RESTRICTED = 'READ_WRITE_RESTRICTED',
}

/* eslint-disable no-unused-vars */
export enum PersonStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  REMOVED = 'REMOVED',
}

export interface Person {
  id: string;
  name: string;
  email: string;
  accessLevel: SharedAccessLevel;
  status: PersonStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AccessLogSharedPerson {
  name: string;
  email: string;
}

export interface AccessLog {
  id: string;
  sharedPersonId: string;
  ownerId: string;
  accessLevel: SharedAccessLevel;
  action: string;
  description: string;
  createdAt: string;
  sharedPerson: AccessLogSharedPerson;
}
