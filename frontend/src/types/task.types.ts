
import type { AssigneeType } from './assignee.types';
import type { TaskCommentType } from './comment.types';

export interface TaskAttachmentType {
  id: string;
  taskId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  createdAt: Date;
}

export interface ChecklistItemType {
  id: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskLabelType {
  id: string;
  name: string;
  color: string;
  taskId: string;
  createdAt: Date;
}

export interface TaskType {
  id: string;
  title: string;
  description?: string;
  listId: string;
  position: number;
  dueDate?: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  assignees?: AssigneeType[];
  attachments?: TaskAttachmentType[];
  checklist?: ChecklistItemType[];
  labels?: TaskLabelType[];
  comments?: TaskCommentType[];
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  position: number;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  isCompleted?: boolean;
  dueDate?: Date;
}
