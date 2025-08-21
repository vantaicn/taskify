import { useMutation } from "@tanstack/react-query";
import listApi from "../api/listApi";
import type { List } from "../types/list.types";
import { toast } from "sonner";
import queryClient from "@/lib/react-query";

const useList = () => {
  const createListMutation = useMutation({
    mutationFn: (data: Omit<List, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>) => listApi.createList(data),
    onSuccess: (data) => {
      toast.success("List created successfully!");
      queryClient.invalidateQueries({ queryKey: ["board", data.boardId] });
    },
    onError: (error: any) => {
      toast.error(`Error creating list: ${error.response?.data?.error}`);
    },
  });

  const updateListTitleMutation = useMutation({
    mutationFn: (data: { boardId: string; listId: string; title: string }) =>
      listApi.updateListTitle(data.boardId, data.listId, data.title),
    onSuccess: (data) => {
      toast.success("List title updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["board", data.boardId] });
    },
    onError: (error: any) => {
      toast.error(`Error updating list title: ${error.response?.data?.error}`);
    },
  });

  const updateListPositionMutation = useMutation({
    mutationFn: (data: { boardId: string; listId: string; position: number }) =>
      listApi.updateListPosition(data.boardId, data.listId, data.position),
    onSuccess: (data) => {
      toast.success("List position updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["board", data.boardId] });
    },
    onError: (error: any) => {
      toast.error(`Error updating list position: ${error.response?.data?.error}`);
    },
  });

  const deleteListMutation = useMutation({
    mutationFn: (data: { boardId: string; listId: string }) =>
      listApi.deleteList(data.boardId, data.listId),
    onSuccess: (data) => {
      toast.success("List deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["board", data.boardId] });
    },
    onError: (error: any) => {
      toast.error(`Error deleting list: ${error.response?.data?.error}`);
    },
  });

  return {
    createListMutation,
    updateListTitleMutation,
    updateListPositionMutation,
    deleteListMutation,
  };
};

export default useList;
