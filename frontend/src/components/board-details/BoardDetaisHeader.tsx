import React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AddMemberButton from "./AddMemberButton";
import Avatar from "@/components/user/Avatar";
import type { BoardType } from "@/types/board.types";
import useBoards from "@/hooks/useBoard";
import useBoardMember from "@/hooks/useBoardMember";
import type { MemberType } from "@/types/member.types";

const BoardDetailsHeader = ({ boardData }: { boardData: BoardType }) => {
  const { updateBoardMutation } = useBoards();
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(boardData?.title);

  React.useEffect(() => {
    setTitle(boardData?.title ?? "");
  }, [boardData?.title]);

  const { getMembersQuery, createMemberMutation } = useBoardMember(
    boardData?.id || ""
  );
  const members = getMembersQuery.data || [];

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
              {title}
            </h1>
          </div>
        )}
      </div>
      <div className="px-6 flex items-center gap-2">
        {/* Members */}
        <div className="flex items-center -space-x-2">
          {members.slice(0, 4).map((member: MemberType, index: number) => {
            const displayName =
              member.user?.fullName ||
              member.user?.email?.split("@")[0] ||
              "Unknown";
            const initials = member.user?.fullName
              ? member.user.fullName
                  .split(" ")
                  .map((name: string) => name[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              : member.user?.email?.split("@")[0].slice(0, 2).toUpperCase() ||
                "U";

            return (
              // <div
              //   key={member.id}
              //   className="relative inline-block group"
              //   style={{ zIndex: members.length - index }}
              //   title={`${displayName} (${member.role})`}
              // >
              //   <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium border-2 border-white shadow-md hover:scale-110 transition-all duration-200 cursor-pointer group-hover:z-50">
              //     {initials}
              //   </div>
              //
              // </div>
              <div
                key={member.id}
                className="relative inline-block group"
                style={{ zIndex: members.length - index }}
                title={`${displayName} (${member.role})`}
              >
                <Avatar
                  src={member.user?.avatarUrl}
                  alt={displayName}
                  size={32}
                />
                {member.role === "admin" && (
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-transparent rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">🗝️</span>
                  </div>
                )}
              </div>
            );
          })}
          {members.length > 4 && (
            <div
              className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-medium border-2 border-white shadow-md hover:scale-110 transition-transform cursor-pointer"
              title={`+${members.length - 4} more members`}
            >
              +{members.length - 4}
            </div>
          )}
        </div>

        <AddMemberButton
          createMemberMutation={createMemberMutation}
          members={members}
        />
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
