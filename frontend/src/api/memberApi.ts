import axiosInstance from "@/lib/axios";
import type { CreateMemberPayload } from "@/types/member.types";

const memberApi = {
  createMember: (boardId: string, payload: CreateMemberPayload) =>
    axiosInstance.post(`/boards/${boardId}/members`, payload),
  getMembers: (boardId: string) => axiosInstance.get(`/boards/${boardId}/members`),
  updateMemberRole: (boardId: string, memberId: string, role: "admin" | "member") =>
    axiosInstance.patch(`/boards/${boardId}/members/${memberId}`, { role }),
  deleteMember: (boardId: string, memberId: string) =>
    axiosInstance.delete(`/boards/${boardId}/members/${memberId}`),
};

export default memberApi;
