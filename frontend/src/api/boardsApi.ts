import axiosInstance from "@/lib/axios";
import type { Board, CreateBoardRequest } from "@/types/board.types";

const boardsApi = {
  getBoards: async () => {
    const response = await axiosInstance.get("/boards");
    return response.data;
  },
  getSharedBoards: async () => {
    const response = await axiosInstance.get("/boards/shared");
    return response.data;
  },
  getBoardById: async (id: string) => {
    const response = await axiosInstance.get(`/boards/${id}`);
    return response.data;
  },
  createBoard: async (data: CreateBoardRequest) => {
    const response = await axiosInstance.post("/boards", data);
    console.log('Board created:', response);
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
