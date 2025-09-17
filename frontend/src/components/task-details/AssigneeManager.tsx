import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Users, Plus, X, Search } from "lucide-react";
import useAssignee from "@/hooks/useAssignee";
import useMember from "@/hooks/useBoardMember";
import type { TaskType } from "@/types/task.types";
import type { MemberType } from "@/types/member.types";
import type { AssigneeType } from "@/types/assignee.types";

interface AssigneeManagerProps {
  assignees: AssigneeType[];
  boardId: string;
  task: TaskType;
  onAssigneeAdded?: (boardId: string, taskId: string) => void;
  onAssigneeRemoved?: (boardId: string, taskId: string) => void;
}

const AssigneeManager = ({ assignees, boardId, task, onAssigneeAdded, onAssigneeRemoved }: AssigneeManagerProps) => {
  console.log("Assignees: ", assignees);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { addAssigneeMutation, removeAssigneeMutation } = useAssignee(task.id);
  const { getMembersQuery } = useMember(boardId);

  const boardMembers = getMembersQuery.data || [];

  // Filter board members that are not already assigned
  const availableMembers = boardMembers.filter(
    (member: MemberType) => 
      !assignees.some((assignee: AssigneeType) => assignee.userId === member.user?.id) &&
      member.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAssignee = async (userId: string) => {
    try {
      await addAssigneeMutation.mutateAsync(userId);
      setSearchTerm("");
      setIsPopoverOpen(false);
      onAssigneeAdded && onAssigneeAdded(boardId, task.id);
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const handleRemoveAssignee = async (userId: string) => {
    try {
      await removeAssigneeMutation.mutateAsync(userId);
      onAssigneeRemoved && onAssigneeRemoved(boardId, task.id);
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // If no assignees, show the "Members" button
  if (assignees.length === 0) {
    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="justify-start">
            <Users className="w-4 h-4 mr-2" />
            Members
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 z-[100] pointer-events-auto" align="start" sideOffset={8}>
          <div className="space-y-4 pointer-events-auto">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <h3 className="font-semibold">Add Member</h3>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pointer-events-auto"
                autoFocus
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 pointer-events-auto">
              {availableMembers.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  {searchTerm ? "No members found" : "No members available"}
                </p>
              ) : (
                availableMembers.map((member: MemberType) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer pointer-events-auto transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddAssignee(member.user!.id);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <Avatar className="w-8 h-8 pointer-events-none">
                      <AvatarImage src={member.user?.avatarUrl} />
                      <AvatarFallback className="text-xs">
                        {getInitials(member.user?.fullName || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 pointer-events-none">
                      <p className="text-sm font-medium">{member.user?.fullName}</p>
                      <p className="text-xs text-gray-500">{member.user?.email}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // If there are assignees, show the avatar list with add button
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Members
        </span>
      </div>
      
      <div className="pl-4">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Display assigned members */}
          {assignees.map((assignee: AssigneeType) => (
            <div key={assignee.id} className="relative group">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="w-8 h-8 cursor-pointer">
                    <AvatarImage src={assignee.user?.avatarUrl} />
                    <AvatarFallback className="text-xs">
                      {getInitials(assignee.user?.fullName || "")}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{assignee.user?.fullName}</p>
                </TooltipContent>
              </Tooltip>
              {/* Remove button on hover */}
              <button
                onClick={() => handleRemoveAssignee(assignee.userId)}
                className="cursor-pointer absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:flex"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {/* Add button */}
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={true}>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <button className="cursor-pointer w-8 h-8 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                    <Plus className="w-4 h-4 text-gray-500" />
                  </button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Member</p>
              </TooltipContent>
            </Tooltip>
            <PopoverContent className="w-80 z-[100] pointer-events-auto" align="start" sideOffset={8}>
              <div className="space-y-4 pointer-events-auto">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <h3 className="font-semibold">Add Member</h3>
                </div>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <Input
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pointer-events-auto"
                    autoFocus
                  />
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2 pointer-events-auto">
                  {availableMembers.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      {searchTerm ? "No members found" : "All members have been added"}
                    </p>
                  ) : (
                    availableMembers.map((member: MemberType) => (
                      <div
                        key={member.id}
                        className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md cursor-pointer pointer-events-auto transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddAssignee(member.user!.id);
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                      >
                        <Avatar className="w-8 h-8 pointer-events-none">
                          <AvatarImage src={member.user?.avatarUrl} />
                          <AvatarFallback className="text-xs">
                            {getInitials(member.user?.fullName || "")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 pointer-events-none">
                          <p className="text-sm font-medium">{member.user?.fullName}</p>
                          <p className="text-xs text-gray-500">{member.user?.email}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default AssigneeManager;
