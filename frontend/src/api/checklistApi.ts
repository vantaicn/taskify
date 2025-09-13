import axiosInstance from "@/lib/axios";
import type { CreateChecklistPayload, UpdateChecklistPayload, UpdateChecklistPositionPayload } from "@/types/checklist.types";

const checklistApi = {
  getChecklists: async (taskId: string) => {
    const response = await axiosInstance.get(`/tasks/${taskId}/checklists`);
    return response.data;
  },
  getChecklistById: async (checklistId: string) => {
    const response = await axiosInstance.get(`/checklists/${checklistId}`);
    return response.data;
  },
  createChecklist: async (taskId: string, checklistData: CreateChecklistPayload) => {
    const response = await axiosInstance.post(`/tasks/${taskId}/checklists`, checklistData);
    return response.data;
  },
  updateChecklist: async (checklistId: string, data: UpdateChecklistPayload) => {
    const response = await axiosInstance.patch(`/checklists/${checklistId}`, data);
    return response.data;
  },
  updateChecklistPosition: async (checklistId: string, data: UpdateChecklistPositionPayload) => {
    const response = await axiosInstance.patch(`/checklists/${checklistId}/position`, data);
    return response.data;
  },
  deleteChecklist: async (checklistId: string) => {
    const response = await axiosInstance.delete(`/checklists/${checklistId}`);
    return response.data;
  }
};

export default checklistApi;