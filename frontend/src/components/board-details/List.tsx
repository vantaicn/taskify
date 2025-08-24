import React from "react";
import Task from "./Task";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
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

import useTask from "@/hooks/useTask";

export interface ListProps {
  list: ListType;
}

const POSITION_GAP = 100;

const List = ({ list }: ListProps) => {
  const { useGetTasks, createTaskMutation } = useTask(list.boardId, list.id);
  const tasksQuery = useGetTasks();
  const tasks = tasksQuery.data || [];

  const [newTaskData, setNewTaskData] = React.useState({
    title: "",
    description: "",
    position: tasks.length > 0 ? tasks[tasks.length - 1].position + POSITION_GAP : 0,
  });
  const [isOpenNewTaskDialog, setIsOpenNewTaskDialog] = React.useState(false);

  const handleCreateTask = async () => {
    await createTaskMutation.mutateAsync(newTaskData);
    setNewTaskData({ title: "", description: "", position: tasks.length > 0 ? tasks[tasks.length - 1].position + POSITION_GAP : 0 });
    setIsOpenNewTaskDialog(false);
  };

  return (
    <Card className="w-[18rem] pb-2 flex-shrink-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-white/30 dark:border-gray-700/30 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            {list.title}
          </CardTitle>
          <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
            {tasks.length}
          </div>
        </div>
      </CardHeader>
    
      <CardContent className="space-y-2 px-2">
        <div className="max-h-[28rem] pb-2 space-y-2 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400/70 dark:hover:scrollbar-thumb-gray-500/70">
          {tasks?.map((task: TaskType) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
    
        <Dialog
          open={isOpenNewTaskDialog}
          onOpenChange={setIsOpenNewTaskDialog}
        >
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full bg-transparent hover:bg-white/40 dark:hover:bg-gray-800/40 text-gray-600 dark:text-gray-400 border-0"
            >
              <Plus className="w-4 h-4" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/20">
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
                <Label htmlFor="task-title" className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
                <Label htmlFor="task-description" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </Label>
                <Input
                  id="task-description"
                  placeholder="Enter task description"
                  value={newTaskData.description}
                  onChange={(e) =>
                    setNewTaskData({ ...newTaskData, description: e.target.value })
                  }
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:border-primary/50 dark:focus:border-primary/50"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50">
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
