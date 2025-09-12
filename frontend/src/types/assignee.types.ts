import type { UserType } from './user.types';

export interface AssigneeType {
  id: string;
  taskId: string;
  userId: string;
  user: UserType;
  createdAt: Date;
  updatedAt: Date;
}
