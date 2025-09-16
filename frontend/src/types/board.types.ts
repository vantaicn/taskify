import type { ListType } from "./list.types";
export interface BoardType {
  id: string;
  title: string;
  description: string;
  backgroundUrl: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;

  lists: ListType[];
}

export interface CreateBoardPayload {
  title: string;
  description?: string;
  backgroundUrl?: string;
}

export interface UpdateBoardPayload {
  title?: string;
  description?: string;
  backgroundUrl?: string;
}
