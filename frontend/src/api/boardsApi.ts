import axiosInstance from "@/lib/axios";

export interface Board {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

const boardsApi = {
  getBoards: async () => {
    const response = await axiosInstance.get("/boards");
    return response.data;
  },
  getBoardById: async (id: string) => {
    const response = await axiosInstance.get(`/boards/${id}`);
    return response.data;
  },
  createBoard: async (data: Board) => {
    const response = await axiosInstance.post("/boards", data);
    return response.data;
  },
  updateBoard: async (id: string, data: Partial<Board>) => {
    const response = await axiosInstance.put(`/boards/${id}`, data);
    return response.data;
  },
  deleteBoard: async (id: string) => {
    const response = await axiosInstance.delete(`/boards/${id}`);
    return response.data;
  },
};

export default boardsApi;
