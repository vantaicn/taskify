import boardsApi from "@/api/boardsApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateBoardPayload } from "@/types/board.types";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner"

const useBoards = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const getBoardsQuery = useQuery({
    queryKey: ["boards", user?.id],
    queryFn: boardsApi.getBoards,
    enabled: !!user?.id,
  });

  const getSharedBoardsQuery = useQuery({
    queryKey: ["sharedBoards", user?.id],
    queryFn: boardsApi.getSharedBoards,
    enabled: !!user?.id,
  });

  const useGetBoardById = (boardId: string) => {
    return useQuery({
      queryKey: ["board", boardId],
      queryFn: () => boardsApi.getBoardById(boardId),
      enabled: !!boardId,
    });
  }

  const createBoardMutation = useMutation({
    mutationFn: boardsApi.createBoard,
    onSuccess: () => {
      // toast.success("Board created successfully");
      queryClient.invalidateQueries({queryKey: ["boards", user?.id]});
    },
    onError: (error: any) => {
      toast.error(`Error creating board: ${error.response?.data?.error}`);
    },
  });

  const updateBoardMutation = useMutation({
    mutationFn: ({boardId, data}: {boardId: string, data: UpdateBoardPayload}) => boardsApi.updateBoard(boardId, data),
    onSuccess: (_, {boardId}) => {
      // toast.success("Board updated successfully");
      queryClient.invalidateQueries({ queryKey: ["board", boardId] });
      queryClient.invalidateQueries({ queryKey: ["boards", user?.id] });
    },
    onError: (error: any) => {
      toast.error(`Error updating board: ${error.response?.data?.error}`);
    },
  });

  const deleteBoardMutation = useMutation({
    mutationFn: boardsApi.deleteBoard,
    onSuccess: (_, boardId) => {
      // toast.success("Board deleted successfully");
      queryClient.removeQueries({ queryKey: ["board", boardId] });
      queryClient.invalidateQueries({ queryKey: ["boards", user?.id] });
    },
    onError: (error: any) => {
      toast.error(`Error deleting board: ${error.response?.data?.error}`);
    },
  });

  return {
    getBoardsQuery,
    getSharedBoardsQuery,
    useGetBoardById,
    createBoardMutation,
    updateBoardMutation,
    deleteBoardMutation,
  };
};

export default useBoards;