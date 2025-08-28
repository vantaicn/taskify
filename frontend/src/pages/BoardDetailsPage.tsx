import React from "react";
import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
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

const POSITION_GAP = 100;

const BoardDetailsPage = () => {
  const { useGetBoardById } = useBoard();
  const { boardId } = useParams();
  const boardQuery = useGetBoardById(boardId || "");
  const board = boardQuery.data;

  const { useGetLists, createListMutation } = useList(boardId || "");
  const listsQuery = useGetLists();
  const lists = listsQuery.data || [];

  const [newList, setNewList] = React.useState({
    title: "",
    boardId: boardId || "",
    position: 0,
  });
  const [isOpenNewListDialog, setIsOpenNewListDialog] = React.useState(false);

  const handleAddListAsync = async () => {
    const position = lists.length > 0 ? Math.round(lists[lists.length - 1].position) + 100 : 0;
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

  const handleDragEnd = (event: DragEndEvent) => {
    // Handle drag end event
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-300 via-purple-300 to-pink-400">
      <BoardDetailsHeader boardData={board} />

      <DndContext onDragEnd={handleDragEnd}>
        {/* Lists */}
        <div className="flex-1 flex items-start gap-4 p-4 mb-4 overflow-x-auto overflow-y-hidden
                        scrollbar-thin
                        scrollbar-track-transparent
                        scrollbar-thumb-transparent
                        hover:scrollbar-thumb-gray-300">
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
                className="min-w-[16rem] bg-white/30 hover:bg-white/50 text-gray-600 border-0"
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
      </DndContext>
    </div>
  );
};

export default BoardDetailsPage;
