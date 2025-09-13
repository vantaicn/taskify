import type { UserType } from './user.types';

export interface TaskCommentType {
  id: string;
  taskId: string;
  userId: string;
  user: UserType;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCommentPayload {
  taskId: string;
  content: string;
}

export interface UpdateCommentPayload {
  commentId: string;
  content: string;
}