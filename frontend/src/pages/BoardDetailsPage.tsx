import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import List from "@/components/board-details/List";
import BoardDetailsHeader from "@/components/board-details/BoardDetaisHeader";
import type { ListType } from "@/types/list.types";

import { useParams } from "react-router-dom";
import useBoard from "@/hooks/useBoard";
import useList from "@/hooks/useList";
import { useTask } from "@/hooks/useTask";
import { toast } from "sonner"

const POSITION_GAP = 100;

const BoardDetailsPage = () => {
  const { useGetBoardById } = useBoard();
  const { boardId } = useParams();
  const boardQuery = useGetBoardById(boardId || "");
  const board = boardQuery.data;

  const { useGetLists, createListMutation } = useList(boardId || "");
  const listsQuery = useGetLists();
  const lists = listsQuery.data || [];
  console.log("lists", lists);

  const [newList, setNewList] = React.useState({
    title: "",
    boardId: boardId || "",
    position: 0,
  });
  const [isOpenNewListDialog, setIsOpenNewListDialog] = React.useState(false);

  const { updateTaskPositionMutation, moveTaskMutation } = useTask(
    boardId || ""
  );

  const handleAddListAsync = async () => {
    const position =
      lists.length > 0
        ? Math.round(lists[lists.length - 1].position) + POSITION_GAP
        : 0;
    await createListMutation.mutateAsync({
      ...newList,
      position,
    });
    setNewList({
      title: "",
      boardId: boardId || "",
      position: 0,
    });
    setIsOpenNewListDialog(false);
  };

  const handleDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    try {
      const sourceList = lists.find(
        (list: ListType) => list.id === source.droppableId
      );
      const destinationList = lists.find(
        (list: ListType) => list.id === destination.droppableId
      );

      const sourceTasks = sourceList?.tasks || [];
      const destinationTasks = destinationList?.tasks || [];
      console.log("source tasks", sourceTasks);
      console.log("destination tasks", destinationTasks);

      const [movedTask] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, movedTask);

      console.log("updated sourceTasks", sourceTasks);
      console.log("updated destinationTasks", destinationTasks);

      let newPosition = 0;
      if (destination.index === 0) {
        const next = destinationTasks[1];
        newPosition = next ? Math.round(next.position) - POSITION_GAP : 0;
      } else if (destination.index === destinationTasks.length - 1) {
        const prev = destinationTasks[destination.index - 1];
        newPosition = prev ? Math.round(prev.position) + POSITION_GAP : 0;
      } else {
        const prev = destinationTasks[destination.index - 1];
        const next = destinationTasks[destination.index + 1];
        if (prev && next) {
          newPosition =
            (Math.round(prev.position) + Math.round(next.position)) / 2;
        }
      }

      if (source.droppableId !== destination.droppableId) {
        await moveTaskMutation.mutateAsync({
          taskId: draggableId,
          sourceListId: source.droppableId,
          targetListId: destination.droppableId,
          position: newPosition,
        });
      } else {
        await updateTaskPositionMutation.mutateAsync({
          taskId: draggableId,
          position: newPosition,
        });
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div
      className="relative flex flex-col h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${board?.backgroundUrl})` }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-white/10" />
      <div className="relative z-10 flex flex-col h-full mb-4">
        <BoardDetailsHeader boardData={board} />
        <DragDropContext onDragEnd={handleDragEnd}>
          {/* Lists */}
          <div
            className="flex-1 flex items-start gap-4 p-4 overflow-x-auto overflow-y-hidden
                          scrollbar-thin
                          scrollbar-track-transparent
                          scrollbar-thumb-transparent
                          hover:scrollbar-thumb-gray-300"
          >
            {lists.map((list: ListType) => (
              <List key={list.id} list={list} />
            ))}
            <Dialog
              open={isOpenNewListDialog}
              onOpenChange={setIsOpenNewListDialog}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-[16rem] bg-white/40 dark:bg-gray-800/30 hover:bg-gray-300/50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-0"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add New List
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New List</DialogTitle>
                  <DialogDescription>
                    Enter the title for the new list.
                  </DialogDescription>
                </DialogHeader>
                <Label htmlFor="list-title">List Title</Label>
                <Input
                  id="list-title"
                  value={newList.title}
                  onChange={(e) =>
                    setNewList({ ...newList, title: e.target.value })
                  }
                  placeholder="Enter list title"
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddListAsync}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default BoardDetailsPage;
