
export interface TaskType {
  id: string;
  title: string;
  description?: string;
  listId: string;
  position: number;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskPayload {
  title: string;
  description?: string;
  position: number;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  dueDate?: Date;
}
