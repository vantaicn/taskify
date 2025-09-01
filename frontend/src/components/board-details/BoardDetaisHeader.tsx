import React from "react";
import { MoreHorizontal, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddMemberButton from "./AddMemberButton";
import type { BoardType } from "@/types/board.types";
import useBoards from "@/hooks/useBoard";

const BoardDetailsHeader = ({ boardData }: { boardData: BoardType }) => {
  const { updateBoardMutation } = useBoards();
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(boardData?.title);

  React.useEffect(() => {
    setTitle(boardData?.title ?? "");
  }, [boardData?.title]);

  const handleSaveEdit = async () => {
    if (title !== boardData?.title) {
      await updateBoardMutation.mutateAsync({
        boardId: boardData.id,
        data: {
          title,
        },
      });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTitle(boardData?.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className="flex-shrink-0 h-14 bg-black/30 backdrop-blur-md flex justify-between items-center">
      <div className="px-6">
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            autoFocus
            size={title.length > 20 ? title.length : 20}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
          />
        ) : (
          <div className="px-4 py-1 hover:bg-white/30 hover:backdrop-blur-sm rounded-sm cursor-pointer">
            <h1
              className="text-lg font-semibold"
              onClick={() => setIsEditing(true)}
            >
              {boardData?.title}
            </h1>
          </div>
        )}
      </div>
      <div className="px-6 flex items-center gap-2">
        <AddMemberButton boardId={boardData?.id} />
        <Button
          variant="outline"
          className="text-sm px-2 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default BoardDetailsHeader;
