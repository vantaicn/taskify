import axiosInstance from "@/lib/axios";
import type { CreateTaskPayload, UpdateTaskPayload } from "@/types/task.types";

const taskApi = {
  getTasks: async (listId: string) => {
    const response = await axiosInstance.get(`/lists/${listId}/tasks`);
    return response.data;
  },
  getTaskById: async (taskId: string) => {
    const response = await axiosInstance.get(`/tasks/${taskId}`);
    return response.data;
  },
  createTask: async (listId: string, taskData: CreateTaskPayload) => {
    const response = await axiosInstance.post(`/lists/${listId}/tasks`, taskData);
    return response.data;
  },
  updateTask: async (taskId: string, data: UpdateTaskPayload) => {
    const response = await axiosInstance.patch(`/tasks/${taskId}`, data);
    return response.data;
  },
  updateTaskPosition: async (taskId: string, position: number) => {
    const response = await axiosInstance.patch(`/tasks/${taskId}/position`, { position });
    return response.data;
  },
  moveTask: async (taskId: string, targetListId: string, position: number) => {
    const response = await axiosInstance.patch(`/tasks/${taskId}/move`, { targetListId, position });
    return response.data;
  },
  deleteTask: async (taskId: string) => {
    const response = await axiosInstance.delete(`/tasks/${taskId}`);
    return response.data;
  }
}

export default taskApi;
