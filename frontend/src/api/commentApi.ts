import axiosInstance from "@/lib/axios";
import type { TaskCommentType, CreateCommentPayload, UpdateCommentPayload } from "@/types/comment.types";
import { get } from "http";

const commentApi = {
  getComments: async (taskId: string): Promise<TaskCommentType[]> => {
    const response = await axiosInstance.get(`/tasks/${taskId}/comments`);
    return response.data;
  },

  createComment: async (payload: CreateCommentPayload): Promise<TaskCommentType> => {
    const response = await axiosInstance.post(`/tasks/${payload.taskId}/comments`, { content: payload.content });
    return response.data;
  },

  updateComment: async (payload: UpdateCommentPayload): Promise<TaskCommentType> => {
    const response = await axiosInstance.put(`/comments/${payload.commentId}`, { content: payload.content });
    return response.data;
  },

  deleteComment: async (commentId: string): Promise<void> => {
    await axiosInstance.delete(`/comments/${commentId}`);
  },
};

export default commentApi;
