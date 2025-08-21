import type { Task } from "./task.types";

export interface List {
  id: string;
  title: string;
  position: number;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;

  tasks: Task[];
}
