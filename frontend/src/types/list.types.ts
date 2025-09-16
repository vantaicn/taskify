import type { TaskType } from "./task.types";

export interface ListType {
  id: string;
  title: string;
  position: number;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;

  tasks: TaskType[];
}

export interface CreateListPayload {
  title: string;
  position: number;
}
