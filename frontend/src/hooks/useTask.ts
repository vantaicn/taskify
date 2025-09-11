import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import taskApi from "../api/taskApi";
import type { CreateTaskPayload, UpdateTaskPayload } from "../types/task.types";
import { toast } from "sonner";

const useTaskList = (boardId:string, listId: string) => {
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
    mutationFn: (data: CreateTaskPayload) => taskApi.createTask(listId, data),
    onSuccess: (createdTask) => {
      toast.success("Task created successfully!");
      queryClient.invalidateQueries({ queryKey: ["list", listId, "tasks"] });
      queryClient.invalidateQueries({ queryKey: ["board", boardId, "lists"] });
    },
    onError: (error: any) => {
      toast.error(`Error creating task: ${error.response?.data?.error}`);
    },
  });

  return {
    useGetTasks,
    useGetTaskById,
    createTaskMutation,
  };
};

const useTask = (boardId: string) => {
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: string;
      data: UpdateTaskPayload;
    }) => taskApi.updateTask(taskId, data),
    onSuccess: (updatedTask, { taskId }) => {
      toast.success("Task updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
      queryClient.invalidateQueries({ queryKey: ["list", updatedTask.listId, "tasks"] });
      queryClient.invalidateQueries({ queryKey: ["board", boardId, "lists"] });
    },
    onError: (error: any) => {
      toast.error(`Error updating task: ${error.response?.data?.error}`);
    },
  });

  const updateTaskPositionMutation = useMutation({
    mutationFn: ({ taskId, listId, position }: { taskId: string; listId: string; position: number }) =>
      taskApi.updateTaskPosition(taskId, position),
    onMutate: async ({ taskId, listId, position }) => {
      await queryClient.cancelQueries({ queryKey: ["list", listId, "tasks"] });

      queryClient.setQueryData(["list", listId, "tasks"], (oldData: any) => {
        if (!oldData) return [];

        const newTasks = oldData.map((task: any) =>
          task.id === taskId ? { ...task, position } : task
        );
        return [...newTasks].sort((a, b) => a.position - b.position);
      });
    },
    onSuccess: (updatedTask) => {
      toast.success("Task position updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["list", updatedTask.listId, "tasks"] });
      queryClient.invalidateQueries({ queryKey: ["board", boardId, "lists"] });
    },
    onError: (error: any) => {
      toast.error(
        `Error updating task position: ${error.response?.data?.error}`
      );
    },
  });

  const moveTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      sourceListId,
      targetListId,
      position
    }: {
      taskId: string;
      sourceListId: string;
      targetListId: string;
      position: number;
    }) => taskApi.moveTask(taskId, sourceListId, targetListId, position),
    onSuccess: (_, { sourceListId, targetListId }) => {
      toast.success("Task moved successfully!");
      queryClient.invalidateQueries({ queryKey: ["list", sourceListId, "tasks"] });
      queryClient.invalidateQueries({ queryKey: ["list", targetListId, "tasks"] });
      queryClient.invalidateQueries({ queryKey: ["board", boardId, "lists"] });
    },
    onError: (error: any) => {
      toast.error(`Error moving task: ${error.response?.data?.error}`);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: taskApi.deleteTask,
    onSuccess: ({ deletedTaskListId }) => {
      toast.success("Task deleted successfully!");
      queryClient.removeQueries({ queryKey: ["list", deletedTaskListId, "tasks"] });
      queryClient.invalidateQueries({ queryKey: ["board", boardId, "lists"] });
    },
    onError: (error: any) => {
      toast.error(`Error deleting task: ${error.response?.data?.error}`);
    },
  });

  return {
    updateTaskMutation,
    updateTaskPositionMutation,
    moveTaskMutation,
    deleteTaskMutation,
  };
};

export { useTaskList, useTask };
