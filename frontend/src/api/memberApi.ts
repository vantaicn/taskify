import axiosInstance from "@/lib/axios";
import type { CreateMemberPayload } from "@/types/member.types";

const memberApi = {
  createMember: async (boardId: string, payload: CreateMemberPayload) => {
    const response = await axiosInstance.post(`/boards/${boardId}/members`, payload);
    return response.data;
  },
  getMembers: async (boardId: string) => {
    const response = await axiosInstance.get(`/boards/${boardId}/members`);
    return response.data;
  },
  updateMemberRole: async (boardId: string, memberId: string, role: "admin" | "member") => {
    const response = await axiosInstance.patch(`/boards/${boardId}/members/${memberId}`, { role });
    return response.data;
  },
  deleteMember: async (boardId: string, memberId: string) => {
    const response = await axiosInstance.delete(`/boards/${boardId}/members/${memberId}`);
    return response.data;
  },
};

export default memberApi;
