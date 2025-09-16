import React, { useEffect } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Edit,
  Clock,
  CalendarIcon,
  AlertCircle,
} from "lucide-react";
import type { TaskType, UpdateTaskPayload } from "@/types/task.types";
import TaskDetails from "@/components/task-details/TaskDetails";
import { useTask } from "@/hooks/useTask";
import { format } from "date-fns";
import Avatar from "@/components/user/Avatar";
import type { AssigneeType } from '@/types/assignee.types';

export interface TaskProps {
  task: TaskType;
  boardId: string;
  index?: number;
  onUpdateTask?: (boardId: string) => void;
}

const Task = ({ task, boardId, index = 0, onUpdateTask }: TaskProps) => {
  const { updateTaskMutation } = useTask(boardId);
  const [taskData, setTaskData] = React.useState(task);
  useEffect(() => {
    setTaskData(task);
  }, [task]);
  const [isOpen, setIsOpen] = React.useState(false);
  
  const dueDate = taskData.dueDate ? new Date(taskData.dueDate) : null;
  const assignees = taskData.assignees;

  const handleUpdateTask = async (updateTask: UpdateTaskPayload) => {
    try {
      await updateTaskMutation.mutateAsync({
        taskId: task.id,
        data: {
          title: updateTask.title,
          description: updateTask.description,
          isCompleted: updateTask.isCompleted,
          dueDate: updateTask.dueDate,
        },
      });
      if (onUpdateTask) {
        onUpdateTask(boardId);
      }
    } catch (error) {
      setTaskData(task);
    }
  };

  const isDueSoon = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const isOverdue = (date: Date) => new Date() > date;

  const getIcon = (dueDate: Date) => {
    if (isOverdue(dueDate)) return <AlertCircle className="w-3 h-3" />;
    if (isDueSoon(dueDate)) return <Clock className="w-3 h-3" />;
    return <CalendarIcon className="w-3 h-3" />;
  };

  const getStatusColor = () => {
    if (!dueDate) return "";
    if (task.isCompleted) {
      return "bg-green-500 text-white hover:bg-green-600";
    }
    if (isOverdue(dueDate)) {
      return "bg-red-500 text-white hover:bg-red-600";
    }
    if (isDueSoon(dueDate)) {
      return "bg-yellow-400 text-black hover:bg-yellow-500";
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Card
            {...provided.dragHandleProps}
            onClick={() => setIsOpen(true)}
            className="group rounded-md p-0 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-700 border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500 cursor-pointer"
          >
            <CardContent className="p-3">
              <div className="flex items-start">
                <Checkbox
                  checked={taskData.isCompleted}
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={async () => {
                    const newTaskData = {
                      ...taskData,
                      isCompleted: !taskData.isCompleted,
                    };
                    setTaskData(newTaskData);
                    await handleUpdateTask(newTaskData);
                  }}
                  className="mt-1 rounded-md bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500 cursor-pointer opacity-0 pointer-events-none w-0 group-hover:mr-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:w-4 data-[state=checked]:mr-2 data-[state=checked]:opacity-100 data-[state=checked]:w-4 data-[state=checked]:pointer-events-auto data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 data-[state=checked]:text-white transition-all duration-300 flex-shrink-0 peer"
                />
                <h4 className="flex-1 text-sm text-gray-900 dark:text-gray-100 peer-data-[state=checked]:text-gray-500 dark:peer-data-[state=checked]:text-gray-400">
                  {taskData.title}
                </h4>

                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <Edit className="w-3 h-3" />
                </Button>
              </div>

              {/* Task metadata */}
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                {dueDate ? (
                  <div
                    className={`flex items-center gap-1 px-1.5 py-0.5 rounded-sm font-semibold ${getStatusColor()}`}
                  >
                    {getIcon(dueDate)}
                    {format(dueDate, "MMM dd")}
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="flex items-center gap-1">
                  {assignees.length > 0 && (
                    <div className="flex -space-x-2">
                      {assignees.slice(0, 3).map((assignee: AssigneeType) => (
                        <Avatar key={assignee.id} src={assignee.user?.avatarUrl} alt={assignee.user?.fullName} size={24} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <VisuallyHidden>
              <DialogTitle>
                Hidden title for accessibility
              </DialogTitle>
            </VisuallyHidden>
            <DialogContent className="sm:max-w-7xl">
              <TaskDetails taskId={taskData.id} boardId={boardId} onUpdate={handleUpdateTask} />
            </DialogContent>
          </Dialog>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
