
export interface Task {
  id: string;
  title: string;
  description?: string;
  listId: string;
  position: number;
  dueDate?: Date;
}
