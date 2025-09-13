export interface ChecklistType {
  id: string;
  title: string;
  isCompleted: boolean;
  taskId: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChecklistPayload {
  title: string;
  position: number;
}

export interface UpdateChecklistPayload {
  title?: string;
  isCompleted?: boolean;
}

export interface UpdateChecklistPositionPayload {
  position: number;
}