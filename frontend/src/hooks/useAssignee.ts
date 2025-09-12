import assigneeApi from "@/api/assigneeApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const useAssignee = (taskId: string) => {
  const queryClient = useQueryClient();

  const getAssigneesQuery = useQuery({
    queryKey: ["assignees", taskId],
    queryFn: () => assigneeApi.getAssigneesByTaskId(taskId),
    enabled: !!taskId,
  });

  const addAssigneeMutation = useMutation({
    mutationFn: (userId: string) => assigneeApi.addAssignee(taskId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignees", taskId] });
      toast.success("Assignee added successfully");
    },
    onError: (error: any) => {
      toast.error(`Error adding assignee: ${error.response?.data?.error}`);
    },
  });

  const removeAssigneeMutation = useMutation({
    mutationFn: (userId: string) => assigneeApi.removeAssignee(taskId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignees", taskId] });
      toast.success("Assignee removed successfully");
    },
    onError: (error: any) => {
      toast.error(`Error removing assignee: ${error.response?.data?.error}`);
    },
  });

  return {
    getAssigneesQuery,
    addAssigneeMutation,
    removeAssigneeMutation,
  };
};

export default useAssignee;
