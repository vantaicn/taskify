import React from "react";
import List from "@/components/board-details/List";
import { MoreHorizontal, UserPlus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import type { ListType } from "@/types/list.types";
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
    position:
      lists.length > 0 ? lists[lists.length - 1].position + POSITION_GAP : 0,
  });
  const [isOpenNewListDialog, setIsOpenNewListDialog] = React.useState(false);

  const handleAddListAsync = async () => {
    await createListMutation.mutateAsync(newList);
    setNewList({
      title: "",
      boardId: boardId || "",
      position:
        lists.length > 0 ? lists[lists.length - 1].position + POSITION_GAP : 0,
    });
    setIsOpenNewListDialog(false);
  };

  return (
    <div className="bg-gradient-to-br from-purple-300 via-purple-300 to-pink-400 min-h-screen">
      {/* Header */}
      <div className="h-16 bg-black/30 backdrop-blur-md flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold">{boardQuery.data?.title}</h1>
        <div className="item-end px-6 flex items-center gap-2">
          <Button variant="outline" className="text-sm text-gray-500">
            <UserPlus className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button variant="outline" className="text-sm text-gray-500 px-2">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Lists */}
      <div className="flex items-start gap-4 p-4 overflow-x-auto w-360
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
    </div>
  );
};

export default BoardDetailsPage;
