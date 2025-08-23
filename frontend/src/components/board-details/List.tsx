import React from "react";
import Task from "./Task";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  CardAction,
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
    <Card className="min-w-[16rem] bg-gray-100 pb-1">
      <CardHeader>
        <CardTitle>{list.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-2">
        <div className="space-y-2 max-h-[30rem] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent hover:scrollbar-thumb-gray-300">
          {tasks?.map((task: TaskType) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
        <Dialog
          open={isOpenNewTaskDialog}
          onOpenChange={setIsOpenNewTaskDialog}
        >
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full border-0 bg-white/30 hover:bg-white/50 text-gray-600 backdrop-blur-md">
              <Plus className="w-4 h-4 mr-1" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Enter the details for the new task.
              </DialogDescription>
            </DialogHeader>
            <Label htmlFor="task-title">Task Title</Label>
            <Input
              id="task-title"
              placeholder="Enter task title"
              value={newTaskData.title}
              onChange={(e) =>
                setNewTaskData({ ...newTaskData, title: e.target.value })
              }
            />
            <Label htmlFor="task-description">Description</Label>
            <Input
              id="task-description"
              placeholder="Enter task description"
              value={newTaskData.description}
              onChange={(e) =>
                setNewTaskData({ ...newTaskData, description: e.target.value })
              }
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleCreateTask}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default List;
