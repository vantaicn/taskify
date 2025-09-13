import commentApi from "@/api/commentApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCommentPayload, UpdateCommentPayload } from "@/types/comment.types";
import { toast } from "sonner"

const useComment = (taskId: string) => {
  const queryClient = useQueryClient();

  const getCommentsQuery = useQuery({
    queryKey: ["comments", taskId],
    queryFn: () => commentApi.getComments(taskId),
    enabled: !!taskId,
  });

  const createCommentMutation = useMutation({
    mutationFn: (payload: CreateCommentPayload) => commentApi.createComment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
      toast.success("Comment added successfully");
    },
    onError: (error: any) => {
      toast.error(`Error adding comment: ${error.response?.data?.error}`);
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: (payload: UpdateCommentPayload) => commentApi.updateComment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
      toast.success("Comment updated successfully");
    },
    onError: (error: any) => {
      toast.error(`Error updating comment: ${error.response?.data?.error}`);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: string) => commentApi.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
      toast.success("Comment deleted successfully");
    },
    onError: (error: any) => {
      toast.error(`Error deleting comment: ${error.response?.data?.error}`);
    },
  });

  return {
    getCommentsQuery,
    createCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
  };
};

export default useComment;
