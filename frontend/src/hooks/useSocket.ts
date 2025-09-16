import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocketStore } from "@/stores/socketStore";

const useSocket = (boardId: string) => {
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();

  // Emitters
  const emitListCreated = useCallback((boardId: string) => {
    socket?.emit("list-created", boardId);
  }, [socket]);

  const emitListUpdated = useCallback((boardId: string) => {
    socket?.emit("list-updated", boardId);
  }, [socket]);

  const emitListDeleted = useCallback((boardId: string) => {
    socket?.emit("list-deleted", boardId);
  }, [socket]);

  const emitJoinBoard = useCallback((boardId: string) => {
    socket?.emit("join-board", boardId);
  }, [socket]);

  const emitLeaveBoard = useCallback((boardId: string) => {
    socket?.emit("leave-board", boardId);
  }, [socket]);

  const emitTaskCreated = useCallback((boardId: string) => {
    socket?.emit("task-created", boardId);
  }, [socket]);

  const emitTaskUpdated = useCallback((boardId: string) => {
    socket?.emit("task-updated", boardId);
  }, [socket]);

  const emitTaskMoved = useCallback((boardId: string) => {
    socket?.emit("task-moved", boardId);
  }, [socket]);

  const emitTaskPositionUpdated = useCallback((boardId: string) => {
    socket?.emit("task-position-updated", boardId);
  }, [socket]);

  // Handlers
  const handleListCreated = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["board", boardIdRef.current],
    });
  }, [queryClient]);

  const handleListUpdated = useCallback(() => {
    console.log("List updated event received");
    queryClient.invalidateQueries({
      queryKey: ["board", boardIdRef.current],
    });
  }, [queryClient]);

  const handleListDeleted = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["board", boardIdRef.current],
    });
  }, [queryClient]);

  const handleTaskCreated = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["board", boardIdRef.current],
    });
  }, [queryClient]);

  const handleTaskUpdated = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["board", boardIdRef.current],
    });
  }, [queryClient]);

  const handleTaskMoved = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["board", boardIdRef.current],
    });
  }, [queryClient]);

  const handleTaskPositionUpdated = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["board", boardIdRef.current] });
  }, [queryClient]);

  const boardIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!socket) return;

    if (boardId && boardIdRef.current !== boardId) {
      emitJoinBoard(boardId);
      boardIdRef.current = boardId;
    }

    socket.on("list-created", handleListCreated);
    socket.on("list-updated", handleListUpdated);
    socket.on("list-deleted", handleListDeleted);
    socket.on("task-created", handleTaskCreated);
    socket.on("task-updated", handleTaskUpdated);
    socket.on("task-moved", handleTaskMoved);
    socket.on("task-position-updated", handleTaskPositionUpdated);

    return () => {
      socket.off("list-created", handleListCreated);
      socket.off("list-updated", handleListUpdated);
      socket.off("list-deleted", handleListDeleted);
      socket.off("task-created", handleTaskCreated);
      socket.off("task-updated", handleTaskUpdated);
      socket.off("task-moved", handleTaskMoved);
      socket.off("task-position-updated", handleTaskPositionUpdated);
      if (boardIdRef.current) {
        emitLeaveBoard(boardIdRef.current);
        boardIdRef.current = null;
      }
    };
  }, [boardId, socket, emitJoinBoard, handleListCreated, handleListUpdated, handleListDeleted, handleTaskCreated, handleTaskUpdated, handleTaskMoved, handleTaskPositionUpdated]);

  return {
    emitJoinBoard,
    emitLeaveBoard,
    emitListCreated,
    emitListUpdated,
    emitListDeleted,
    emitTaskCreated,
    emitTaskUpdated,
    emitTaskMoved,
    emitTaskPositionUpdated,
  };
};

export default useSocket;
