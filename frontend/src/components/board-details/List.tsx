import React, { use } from "react";
import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { ListType } from "@/types/list.types";
import type { TaskType } from "@/types/task.types";
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

import useList from "@/hooks/useList";
import { useTaskList } from "@/hooks/useTask";

export interface ListProps {
  list: ListType;
  onUpdateList?: (boardId: string) => void;
  onCreateTask?: (boardId: string) => void;
  onUpdateTask?: (boardId: string, taskId: string) => void;
  onAssigneeAdded?: (boardId: string, taskId: string) => void;
  onAssigneeRemoved?: (boardId: string, taskId: string) => void;
  onChecklistAdded?: (taskId: string) => void;
  onChecklistUpdated?: (taskId: string) => void;
  onChecklistDeleted?: (taskId: string) => void;
  onAttachmentAdded?: (taskId: string) => void;
  onAttachmentUpdated?: (taskId: string) => void;
  onAttachmentRemoved?: (taskId: string) => void;
}

const POSITION_GAP = 100;

const List = ({
  list,
  onUpdateList,
  onCreateTask,
  onUpdateTask,
  onAssigneeAdded,
  onAssigneeRemoved,
  onChecklistAdded,
  onChecklistUpdated,
  onChecklistDeleted,
  onAttachmentAdded,
  onAttachmentUpdated,
  onAttachmentRemoved,
}: ListProps) => {
  const tasks = list.tasks;

  const { updateListTitleMutation } = useList(list.boardId);
  const { createTaskMutation } = useTaskList(list.boardId, list.id);

  const [newTaskData, setNewTaskData] = React.useState({
    title: "",
    description: "",
    position: 0,
  });
  const [isOpenNewTaskDialog, setIsOpenNewTaskDialog] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [listTitle, setListTitle] = React.useState(list.title);

  React.useEffect(() => {
    setListTitle(list.title);
  }, [list.title]);

  const handleSaveEdit = async () => {
    if (listTitle !== list.title) {
      await updateListTitleMutation.mutateAsync({
        listId: list.id,
        title: listTitle,
      });
    }
    onUpdateList?.(list.boardId || "");
    setIsEditing(false);
  };

  const handleCreateTask = async () => {
    const position =
      tasks.length > 0
        ? Math.round(tasks[tasks.length - 1].position) + POSITION_GAP
        : 0;
    await createTaskMutation.mutateAsync({ ...newTaskData, position });
    setNewTaskData({
      title: "",
      description: "",
      position: 0,
    });
    if (onCreateTask) {
      onCreateTask(list.boardId || "");
    }
    setIsOpenNewTaskDialog(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setListTitle(list.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <Card className="w-[18rem] py-2 gap-2 flex-shrink-0 bg-white/90 dark:bg-gray-800/60 border border-white/30 dark:border-gray-700/30 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-md font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {isEditing ? (
              <Input
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onBlur={handleSaveEdit}
                onKeyDown={handleKeyDown}
                autoFocus
                className="mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
              />
            ) : (
              <p
                className="mt-2 cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {listTitle}
              </p>
            )}
          </CardTitle>
          <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 px-2">
        <Droppable droppableId={list.id} type="TASK">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="max-h-[28rem] pb-2 space-y-2 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400/70 dark:hover:scrollbar-thumb-gray-500/70"
            >
              {list.tasks?.map((task: TaskType, index: number) => (
                <Task
                  key={task.id}
                  task={task}
                  boardId={list.boardId}
                  index={index}
                  onUpdateTask={onUpdateTask}
                  onAssigneeAdded={onAssigneeAdded}
                  onAssigneeRemoved={onAssigneeRemoved}
                  onChecklistAdded={onChecklistAdded}
                  onChecklistUpdated={onChecklistUpdated}
                  onChecklistDeleted={onChecklistDeleted}
                  onAttachmentAdded={onAttachmentAdded}
                  onAttachmentUpdated={onAttachmentUpdated}
                  onAttachmentRemoved={onAttachmentRemoved}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        <Dialog
          open={isOpenNewTaskDialog}
          onOpenChange={setIsOpenNewTaskDialog}
        >
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full bg-transparent hover:bg-gray-300/50 dark:hover:bg-gray-800/50 text-gray-600 dark:text-gray-400 border-0"
            >
              <Plus className="w-4 h-4" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/95 dark:bg-gray-900/95 border border-white/20 dark:border-gray-700/20">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Add New Task
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                Enter the details for the new task.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="task-title"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Task Title
                </Label>
                <Input
                  id="task-title"
                  placeholder="Enter task title"
                  value={newTaskData.title}
                  onChange={(e) =>
                    setNewTaskData({ ...newTaskData, title: e.target.value })
                  }
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:border-primary/50 dark:focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="task-description"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </Label>
                <Input
                  id="task-description"
                  placeholder="Enter task description"
                  value={newTaskData.description}
                  onChange={(e) =>
                    setNewTaskData({
                      ...newTaskData,
                      description: e.target.value,
                    })
                  }
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:border-primary/50 dark:focus:border-primary/50"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="bg-white/50 dark:bg-gray-800/50"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleCreateTask}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default List;
