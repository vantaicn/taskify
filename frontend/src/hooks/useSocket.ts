import { useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSocketStore } from "@/stores/socketStore";

const useSocket = (boardId: string) => {
  const socket = useSocketStore((state) => state.socket);
  const queryClient = useQueryClient();

  // Emitters
  const emitListCreated = useCallback(
    (boardId: string) => {
      socket?.emit("list-created", boardId);
    },
    [socket]
  );

  const emitListUpdated = useCallback(
    (boardId: string) => {
      socket?.emit("list-updated", boardId);
    },
    [socket]
  );

  const emitListDeleted = useCallback(
    (boardId: string) => {
      socket?.emit("list-deleted", boardId);
    },
    [socket]
  );

  const emitJoinBoard = useCallback(
    (boardId: string) => {
      socket?.emit("join-board", boardId);
    },
    [socket]
  );

  const emitLeaveBoard = useCallback(
    (boardId: string) => {
      socket?.emit("leave-board", boardId);
    },
    [socket]
  );

  const emitTaskCreated = useCallback(
    (boardId: string) => {
      socket?.emit("task-created", boardId);
    },
    [socket]
  );

  const emitTaskUpdated = useCallback(
    (boardId: string, taskId: string) => {
      socket?.emit("task-updated", boardId, taskId);
    },
    [socket]
  );

  const emitTaskMoved = useCallback(
    (boardId: string) => {
      socket?.emit("task-moved", boardId);
    },
    [socket]
  );

  const emitTaskPositionUpdated = useCallback(
    (boardId: string) => {
      socket?.emit("task-position-updated", boardId);
    },
    [socket]
  );

  const emitAssigneeAdded = useCallback(
    (boardId: string, taskId: string) => {
      socket?.emit("assignee-added", boardId, taskId);
    },
    [socket]
  );

  const emitAssigneeRemoved = useCallback(
    (boardId: string, taskId: string) => {
      socket?.emit("assignee-removed", boardId, taskId);
    },
    [socket]
  );

  const emitChecklistAdded = useCallback(
    (taskId: string) => {
      socket?.emit("checklist-added", boardIdRef.current, taskId);
    },
    [socket]
  );

  const emitChecklistUpdated = useCallback(
    (taskId: string) => {
      socket?.emit("checklist-updated", boardIdRef.current, taskId);
    },
    [socket]
  );

  const emitChecklistDeleted = useCallback(
    (taskId: string) => {
      socket?.emit("checklist-deleted", boardIdRef.current, taskId);
    },
    [socket]
  );

  const emitAttachmentAdded = useCallback(
    (taskId: string) => {
      socket?.emit("attachment-added", boardIdRef.current, taskId);
    },
    [socket]
  );

  const emitAttachmentUpdated = useCallback(
    (taskId: string) => {
      socket?.emit("attachment-updated", boardIdRef.current, taskId);
    },
    [socket]
  );

  const emitAttachmentRemoved = useCallback(
    (taskId: string) => {
      socket?.emit("attachment-removed", boardIdRef.current, taskId);
    },
    [socket]
  );

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

  const handleTaskUpdated = useCallback(
    (taskId: string) => {
      queryClient.invalidateQueries({
        queryKey: ["board", boardIdRef.current],
      });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
    [queryClient]
  );

  const handleTaskMoved = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ["board", boardIdRef.current],
    });
  }, [queryClient]);

  const handleTaskPositionUpdated = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["board", boardIdRef.current] });
  }, [queryClient]);

  const handleAssigneeAdded = useCallback((boardId: string, taskId: string) => {
    queryClient.invalidateQueries({
      queryKey: ["board", boardId],
    });
    queryClient.invalidateQueries({ queryKey: ["task", taskId] });
  }, [queryClient]);

  const handleAssigneeRemoved = useCallback((boardId: string, taskId: string) => {
    queryClient.invalidateQueries({
      queryKey: ["board", boardId],
    });
    queryClient.invalidateQueries({ queryKey: ["task", taskId] });
  }, [queryClient]);

  const handleChecklistAdded = useCallback((taskId: string) => {
    queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    console.log("Checklist added event received");
  }, [queryClient]);

  const handleChecklistUpdated = useCallback((taskId: string) => {
    queryClient.invalidateQueries({ queryKey: ["task", taskId] });
  }, [queryClient]);

  const handleChecklistDeleted = useCallback((taskId: string) => {
    queryClient.invalidateQueries({ queryKey: ["task", taskId] });
  }, [queryClient]);

  const handleAttachmentAdded = useCallback((taskId: string) => {
    queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    console.log("Attachment added event received");
  }, [queryClient]);

  const handleAttachmentUpdated = useCallback((taskId: string) => {
    queryClient.invalidateQueries({ queryKey: ["task", taskId] });
  }, [queryClient]);

  const handleAttachmentRemoved = useCallback((taskId: string) => {
    queryClient.invalidateQueries({ queryKey: ["task", taskId] });
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
    socket.on("assignee-added", handleAssigneeAdded);
    socket.on("assignee-removed", handleAssigneeRemoved);
    socket.on("checklist-added", handleChecklistAdded);
    socket.on("checklist-updated", handleChecklistUpdated);
    socket.on("checklist-deleted", handleChecklistDeleted);
    socket.on("attachment-added", handleAttachmentAdded);
    socket.on("attachment-updated", handleAttachmentUpdated);
    socket.on("attachment-removed", handleAttachmentRemoved);

    return () => {
      socket.off("list-created", handleListCreated);
      socket.off("list-updated", handleListUpdated);
      socket.off("list-deleted", handleListDeleted);
      socket.off("task-created", handleTaskCreated);
      socket.off("task-updated", handleTaskUpdated);
      socket.off("task-moved", handleTaskMoved);
      socket.off("task-position-updated", handleTaskPositionUpdated);
      socket.off("assignee-added", handleAssigneeAdded);
      socket.off("assignee-removed", handleAssigneeRemoved);
      socket.off("checklist-added", handleChecklistAdded);
      socket.off("checklist-updated", handleChecklistUpdated);
      socket.off("checklist-deleted", handleChecklistDeleted);
      socket.off("attachment-added", handleAttachmentAdded);
      socket.off("attachment-updated", handleAttachmentUpdated);
      socket.off("attachment-removed", handleAttachmentRemoved);
      if (boardIdRef.current) {
        emitLeaveBoard(boardIdRef.current);
        boardIdRef.current = null;
      }
    };
  }, [
    boardId,
    socket,
    emitJoinBoard,
    handleListCreated,
    handleListUpdated,
    handleListDeleted,
    handleTaskCreated,
    handleTaskUpdated,
    handleTaskMoved,
    handleTaskPositionUpdated,
    emitLeaveBoard,
    handleAssigneeAdded,
    handleAssigneeRemoved,
    handleChecklistAdded,
    handleChecklistUpdated,
    handleChecklistDeleted,
    handleAttachmentAdded,
    handleAttachmentUpdated,
    handleAttachmentRemoved,
  ]);

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
    emitAssigneeAdded,
    emitAssigneeRemoved,
    emitChecklistAdded,
    emitChecklistUpdated,
    emitChecklistDeleted,
    emitAttachmentAdded,
    emitAttachmentUpdated,
    emitAttachmentRemoved,
  };
};

export default useSocket;
