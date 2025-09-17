import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import memberApi from "@/api/memberApi";
import type { CreateMemberPayload, MemberType } from "../types/member.types";
import { toast } from "sonner";

const useMember = (boardId: string) => {
  const queryClient = useQueryClient();

  const getMembersQuery = useQuery({
    queryKey: ["members", boardId],
    queryFn: () => memberApi.getMembers(boardId),
    enabled: !!boardId,
  });

  const createMemberMutation = useMutation({
    mutationFn: (payload: CreateMemberPayload) =>
      memberApi.createMember(boardId, payload),
    onSuccess: () => {
      // toast.success("Member added successfully");
      queryClient.invalidateQueries({ queryKey: ["members", boardId] });
    },
    onError: (error: any) => {
      toast.error(`Failed to add member: ${error.response?.data?.error}`);
    },
  });

  const updateMemberRoleMutation = useMutation({
    mutationFn: ({
      memberId,
      role,
    }: {
      memberId: string;
      role: "admin" | "member";
    }) => memberApi.updateMemberRole(boardId, memberId, role),
    onSuccess: () => {
      // toast.success("Member role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["members", boardId] });
    },
    onError: (error: any) => {
      toast.error(`Failed to update member role: ${error.response?.data?.error}`);
    },
  });

  const deleteMemberMutation = useMutation({
    mutationFn: (memberId: string) => memberApi.deleteMember(boardId, memberId),
    onSuccess: () => {
      // toast.success("Member removed successfully");
      queryClient.invalidateQueries({ queryKey: ["members", boardId] });
    },
    onError: (error: any) => {
      toast.error(`Failed to remove member: ${error.response?.data?.error}`);
    },
  });

  return {
    createMemberMutation,
    updateMemberRoleMutation,
    getMembersQuery,
    deleteMemberMutation,
  };
};

export default useMember;
