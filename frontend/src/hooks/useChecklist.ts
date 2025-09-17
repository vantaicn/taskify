import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import checklistApi from "../api/checklistApi";
import type { CreateChecklistPayload, UpdateChecklistPayload, UpdateChecklistPositionPayload } from "../types/checklist.types";
import { toast } from "sonner";

const useChecklist = (taskId: string) => {
  const queryClient = useQueryClient();

  const getChecklistsQuery = useQuery({
    queryKey: ["task", taskId, "checklists"],
    queryFn: () => checklistApi.getChecklists(taskId),
    enabled: !!taskId,
  });

  const getChecklistByIdQuery = (checklistId: string) => {
    return useQuery({
      queryKey: ["checklist", checklistId],
      queryFn: () => checklistApi.getChecklistById(checklistId),
      enabled: !!checklistId,
    });
  };

  const createChecklistMutation = useMutation({
    mutationFn: (data: CreateChecklistPayload) => checklistApi.createChecklist(taskId, data),
    onSuccess: () => {
      // toast.success("Checklist item created successfully!");
      queryClient.invalidateQueries({ queryKey: ["task", taskId, "checklists"] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
    onError: (error: any) => {
      toast.error(`Error creating checklist: ${error.response?.data?.error || error.message}`);
    },
  });

  const updateChecklistMutation = useMutation({
    mutationFn: ({ checklistId, data }: { checklistId: string; data: UpdateChecklistPayload }) =>
      checklistApi.updateChecklist(checklistId, data),
    onSuccess: (updatedChecklist) => {
      // toast.success("Checklist item updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["task", taskId, "checklists"] });
      queryClient.invalidateQueries({ queryKey: ["checklist", updatedChecklist.id] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
    onError: (error: any) => {
      toast.error(`Error updating checklist: ${error.response?.data?.error || error.message}`);
    },
  });

  const updateChecklistPositionMutation = useMutation({
    mutationFn: ({ checklistId, data }: { checklistId: string; data: UpdateChecklistPositionPayload }) =>
      checklistApi.updateChecklistPosition(checklistId, data),
    onSuccess: (updatedChecklist) => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId, "checklists"] });
      queryClient.invalidateQueries({ queryKey: ["checklist", updatedChecklist.id] });
    },
    onError: (error: any) => {
      toast.error(`Error updating checklist position: ${error.response?.data?.error || error.message}`);
    },
  });

  const deleteChecklistMutation = useMutation({
    mutationFn: (checklistId: string) => checklistApi.deleteChecklist(checklistId),
    onSuccess: () => {
      // toast.success("Checklist item deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["task", taskId, "checklists"] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
    onError: (error: any) => {
      toast.error(`Error deleting checklist: ${error.response?.data?.error || error.message}`);
    },
  });

  return {
    getChecklistsQuery,
    getChecklistByIdQuery,
    createChecklistMutation,
    updateChecklistMutation,
    updateChecklistPositionMutation,
    deleteChecklistMutation,
  };
};

export default useChecklist;