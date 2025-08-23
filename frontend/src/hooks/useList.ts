import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import listApi from "../api/listApi";
import type { CreateListPayload } from "../types/list.types";
import { toast } from "sonner";

const useList = (boardId: string) => {
  const queryClient = useQueryClient();

  const useGetLists = () => {
    return useQuery({
      queryKey: ["board", boardId, "lists"],
      queryFn: () => listApi.getLists(boardId),
      enabled: !!boardId,
    });
  };

  const useGetListById = (listId: string) => {
    return useQuery({
      queryKey: ["list", listId],
      queryFn: () => listApi.getListById(listId),
      enabled: !!listId,
    });
  };

  const createListMutation = useMutation({
    mutationFn: (data: CreateListPayload) => listApi.createList(boardId, data),
    onSuccess: () => {
      toast.success("List created successfully!");
      queryClient.invalidateQueries({ queryKey: ["board", boardId, "lists"] });
    },
    onError: (error: any) => {
      toast.error(`Error creating list: ${error.response?.data?.error}`);
    },
  });

  const updateListTitleMutation = useMutation({
    mutationFn: ({listId, title}: {listId: string; title: string}) =>
      listApi.updateListTitle(listId, title),
    onSuccess: (_, {listId}) => {
      toast.success("List title updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["list", listId] });
      queryClient.invalidateQueries({ queryKey: ["board", boardId, "lists"] });
    },
    onError: (error: any) => {
      toast.error(`Error updating list title: ${error.response?.data?.error}`);
    },
  });

  const updateListPositionMutation = useMutation({
    mutationFn: ({listId, position}: {listId: string; position: number}) =>
      listApi.updateListPosition(listId, position),
    onSuccess: () => {
      toast.success("List position updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["board", boardId, "lists"] });
    },
    onError: (error: any) => {
      toast.error(`Error updating list position: ${error.response?.data?.error}`);
    },
  });

  const deleteListMutation = useMutation({
    mutationFn: listApi.deleteList,
    onSuccess: () => {
      toast.success("List deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["board", boardId, "lists"] });
    },
    onError: (error: any) => {
      toast.error(`Error deleting list: ${error.response?.data?.error}`);
    },
  });

  return {
    useGetLists,
    useGetListById,
    createListMutation,
    updateListTitleMutation,
    updateListPositionMutation,
    deleteListMutation,
  };
};

export default useList;
