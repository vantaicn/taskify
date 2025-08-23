import axiosInstance from "@/lib/axios";
import type { CreateListPayload } from "@/types/list.types";

const listApi = {
  getLists: async (boardId: string) => {
    const response = await axiosInstance.get(`/boards/${boardId}/lists`);
    return response.data;
  },
  getListById: async (listId: string) => {
    const response = await axiosInstance.get(`/lists/${listId}`);
    return response.data;
  },
  createList: async (boardId: string, data: CreateListPayload) => {
    const response = await axiosInstance.post(`/boards/${boardId}/lists`, data);
    return response.data;
  },
  updateListTitle: async (listId: string, title: string) => {
    const response = await axiosInstance.put(`/lists/${listId}`, { title });
    return response.data;
  },
  updateListPosition: async (listId: string, position: number) => {
    const response = await axiosInstance.put(`/lists/${listId}/position`, { position });
    return response.data;
  },
  deleteList: async (listId: string) => {
    const response = await axiosInstance.delete(`/lists/${listId}`);
    return response.data;
  }
}

export default listApi;