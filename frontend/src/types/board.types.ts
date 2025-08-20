
export interface Board {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBoardRequest {
  title: string;
  description: string;
}