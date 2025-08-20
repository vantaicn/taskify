import boardsApi from "@/api/boardsApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Board } from "@/types/board.types";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner"

const useBoards = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const getBoardsQuery = useQuery<Board[]>({
    queryKey: ["boards", user?.id],
    queryFn: boardsApi.getBoards,
    enabled: !!user?.id,
  });

  const getSharedBoardsQuery = useQuery<Board[]>({
    queryKey: ["sharedBoards", user?.id],
    queryFn: boardsApi.getSharedBoards,
    enabled: !!user?.id,
  });

  const useGetBoardById = (id: string) => {
    return useQuery({
      queryKey: ["board", id],
      queryFn: () => boardsApi.getBoardById(id),
      enabled: !!id,
    });
  }

  const createBoardMutation = useMutation({
    mutationFn: boardsApi.createBoard,
    onSuccess: () => {
      toast.success("Board created successfully");
      queryClient.invalidateQueries({queryKey: ["boards", user?.id]});
    },
    onError: () => {
      toast.error("Error creating board");
    },
  });

  const updateBoardMutation = useMutation({
    mutationFn: ({id, data}: {id: string, data: Partial<Board>}) => boardsApi.updateBoard(id, data),
    onSuccess: (_, {id}) => {
      toast.success("Board updated successfully");
      queryClient.invalidateQueries({ queryKey: ["board", id] });
      queryClient.invalidateQueries({ queryKey: ["boards", user?.id] });
    },
    onError: () => {
      toast.error("Error updating board");
    },
  });

  const deleteBoardMutation = useMutation({
    mutationFn: (id: string) => boardsApi.deleteBoard(id),
    onSuccess: (_, id) => {
      toast.success("Board deleted successfully");
      queryClient.removeQueries({ queryKey: ["board", id] });
      queryClient.invalidateQueries({ queryKey: ["boards", user?.id] });
    },
    onError: () => {
      toast.error("Error deleting board");
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