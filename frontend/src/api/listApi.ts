import axiosInstance from "@/lib/axios";
import type { List } from "@/types/list.types";

const listApi = {
  getLists: async (boardId: string) => {
    const response = await axiosInstance.get(`/boards/${boardId}/lists`);
    return response.data;
  },
  getList: async (boardId: string, listId: string) => {
    const response = await axiosInstance.get(`/boards/${boardId}/lists/${listId}`);
    return response.data;
  },
  createList: async (data: Omit<List, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>) => {
    const response = await axiosInstance.post(`/boards/${data.boardId}/lists`, data);
    return response.data;
  },
  updateListTitle: async (boardId: string, listId: string, title: string) => {
    const response = await axiosInstance.put(`/boards/${boardId}/lists/${listId}`, { title });
    return response.data;
  },
  updateListPosition: async (boardId: string, listId: string, position: number) => {
    const response = await axiosInstance.put(`/boards/${boardId}/lists/${listId}/position`, { position });
    return response.data;
  },
  deleteList: async (boardId: string, listId: string) => {
    const response = await axiosInstance.delete(`/boards/${boardId}/lists/${listId}`);
    return response.data;
  }
}

export default listApi;