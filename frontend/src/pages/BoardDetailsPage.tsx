import List from "@/components/board-details/List";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

import useBoards from "@/hooks/useBoards";


const BoardDetailsPage = () => {
  const { useGetBoardById } = useBoards();
  const { boardId } = useParams<{ boardId: string }>();
  const boardQuery = useGetBoardById(boardId || "");

  const handleAddList = () => {
    // Logic to add a new list
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
        <List />
        <List />
        <Button variant="outline" className="w-64" onClick={handleAddList}>
          + Add New List
        </Button>
      </div>    
    </>
  );
};

export default BoardDetailsPage;
