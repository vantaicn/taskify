import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import taskApi from "../api/taskApi";
import type { CreateTaskPayload, UpdateTaskPayload } from "../types/task.types";
import { toast } from "sonner";

const useTask = (boardId: string, listId: string) => {
  const queryClient = useQueryClient();

  const useGetTasks = () => {
    return useQuery({
      queryKey: ["list", listId, "tasks"],
      queryFn: () => taskApi.getTasks(listId),
      enabled: !!listId,
    });
  };

  const useGetTaskById = (taskId: string) => {
    return useQuery({
      queryKey: ["task", taskId],
      queryFn: () => taskApi.getTaskById(taskId),
      enabled: !!taskId,
    });
  };

  const createTaskMutation = useMutation({
    mutationFn: (data: CreateTaskPayload) =>
      taskApi.createTask(listId, data),
    onSuccess: () => {
      toast.success("Task created successfully!");
      queryClient.invalidateQueries({ queryKey: ["list", listId, "tasks"] });
    },
    onError: (error: any) => {
      toast.error(`Error creating task: ${error.response?.data?.error}`);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: UpdateTaskPayload }) =>
      taskApi.updateTask(taskId, data),
    onSuccess: (_, { taskId }) => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["list", listId, "tasks"] });
    },
    onError: (error: any) => {
      toast.error(`Error updating task: ${error.response?.data?.error}`);
    },
  });

  const updateTaskPositionMutation = useMutation({
    mutationFn: ({ taskId, position }: { taskId: string; position: number }) =>
      taskApi.updateTaskPosition(taskId, position),
    onSuccess: () => {
      toast.success("Task position updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["list", listId, "tasks"] });
    },
    onError: (error: any) => {
      toast.error(`Error updating task position: ${error.response?.data?.error}`);
    },
  });

  const moveTaskMutation = useMutation({
    mutationFn: ({ taskId, targetListId }: { taskId: string; targetListId: string }) =>
      taskApi.moveTask(taskId, targetListId),
    onSuccess: (_, { taskId, targetListId }) => {
      toast.success("Task moved successfully!");
      queryClient.invalidateQueries({ queryKey: ["list", listId, "tasks"] });
      queryClient.invalidateQueries({ queryKey: ["list", targetListId, "tasks"] });
    },
    onError: (error: any) => {
      toast.error(`Error moving task: ${error.response?.data?.error}`);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: () => {
      toast.success("Task deleted successfully!");
      queryClient.removeQueries({ queryKey: ["list", listId, "tasks"] });
    },
    onError: (error: any) => {
      toast.error(`Error deleting task: ${error.response?.data?.error}`);
    },
  });

  return {
    useGetTasks,
    useGetTaskById,
    createTaskMutation,
    updateTaskMutation,
    updateTaskPositionMutation,
    moveTaskMutation,
    deleteTaskMutation,
  };
};

export default useTask;