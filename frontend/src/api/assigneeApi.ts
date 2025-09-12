import axiosInstance from "@/lib/axios";

const assigneeApi = {
  getAssigneesByTaskId: async (taskId: string) => {
    const response = await axiosInstance.get(`/tasks/${taskId}/assignees`);
    return response.data;
  },
  addAssignee: async (taskId: string, userId: string) => {
    const response = await axiosInstance.post(`/tasks/${taskId}/assignees`, {
      userId,
    });
    return response.data;
  },
  removeAssignee: async (taskId: string, userId: string) => {
    const response = await axiosInstance.delete(
      `/tasks/${taskId}/assignees/${userId}`
    );
    return response.data;
  },
};  

export default assigneeApi;
