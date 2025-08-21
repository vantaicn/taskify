import React from "react";
import List from "@/components/board-details/List";
import { MoreHorizontal, UserPlus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import type { List as ListType } from "@/types/list.types";

import useBoards from "@/hooks/useBoards";
import useList from "@/hooks/useList";

const POSITION_GAP = 100;

const BoardDetailsPage = () => {
  const { useGetBoardById } = useBoards();
  const { boardId } = useParams();
  const boardQuery = useGetBoardById(boardId || "");

  const board = boardQuery.data;
  const lists = board?.lists || [];
  console.log("Board details:", board);
  console.log("Lists:", lists);

  const { createListMutation } = useList();

  const [newList, setNewList] = React.useState({ title: "", boardId: boardId || "", position: lists.length > 0 ? lists[lists.length - 1].position + POSITION_GAP : 0 });

  const handleAddListAsync = async () => {
    await createListMutation.mutateAsync(newList);
    setNewList({ title: "", boardId: boardId || "", position: lists.length > 0 ? lists[lists.length - 1].position + POSITION_GAP : 0 });
  };

  return (
    <>
      {/* Header */}
      <div className="h-16 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-4">
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
      <div className="flex space-x-4 p-4">
        {lists.map((list: ListType) => (
          <List key={list.id} list={list} />
        ))}
        <Button variant="outline" className="w-64" onClick={handleAddListAsync}>
          <Plus className="w-4 h-4 mr-1" />
          Add New List
        </Button>
      </div>    
    </>
  );
};

export default BoardDetailsPage;
