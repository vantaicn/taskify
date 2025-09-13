import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Paperclip,
  Tag,
  CheckCircle2,
} from "lucide-react";
import type { TaskType } from "@/types/task.types";
import Attachments from "@/components/task-details/Attachments";
import Checklist from "@/components/task-details/Checklist";
import Comments from "@/components/task-details/Comments";
import DueDatePicker from "@/components/task-details/DueDatePicker";
import AssigneeManager from "@/components/task-details/AssigneeManager";
import useAssignee from "@/hooks/useAssignee";

interface TaskDetailsProps {
  task?: TaskType;
  boardId: string;
  onUpdate?: (taskData: any) => void;
}

const TaskDetails = ({ task, boardId, onUpdate }: TaskDetailsProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [dueDate, setDueDate] = useState<Date | null>(task?.dueDate ? new Date(task.dueDate) : null);
  const { getAssigneesQuery } = useAssignee(task?.id || "");
  const assignees = getAssigneesQuery.data || [];

  const handleSaveTitle = () => {
    if (title !== task?.title) {
      onUpdate?.({ title });
    }
    setIsEditingTitle(false);
  };

  const handleSaveDescription = () => {
    if (description !== task?.description) {
      onUpdate?.({ description });
    }
    setIsEditingDescription(false);
  };

  const handleDueDateChange = (date: Date | null) => {
    setDueDate(date);
    onUpdate?.({ dueDate: date });
  };

  return (
    <div className="flex flex-col max-h-[80vh]">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <div className="flex-1">
            {isEditingTitle ? (
              <Input
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                onBlur={handleSaveTitle}
                onKeyDown={(e: any) => e.key === "Enter" && handleSaveTitle()}
                className="text-xl font-semibold border-0 bg-transparent"
                autoFocus
                size={Math.min(title!.length, 50)}
              />
            ) : (
              <h2
                className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1 -mx-2 -my-1"
                onClick={() => setIsEditingTitle(true)}
              >
                {title}
              </h2>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-6 p-6 overflow-auto">
        {/* Main Content */}
        <div className="flex-4 space-y-6 overflow-y-auto">
          {/* Action Buttons */}
          <div className="flex gap-2">
            {task && assignees.length === 0 && <AssigneeManager task={task} boardId={boardId} />}
            <Button variant="outline" size="sm" className="justify-start">
              <Tag className="w-4 h-4 mr-2" />
              Nhãn
            </Button>
            {
              !dueDate && (
                <DueDatePicker dueDate={dueDate || undefined} onDateChange={handleDueDateChange} />
              )
            }
            {/* <Button variant="outline" size="sm" className="justify-start">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Checklist
            </Button> */}
            <Button variant="outline" size="sm" className="justify-start">
              <Paperclip className="w-4 h-4 mr-2" />
              Đính kèm
            </Button>
          </div>

          {/* Assignee Manager */}
          {task && assignees.length > 0 && <AssigneeManager task={task} boardId={boardId} />}

          {/* Labels */}
          {/* <Labels /> */}

          {/* Due Date Display */}
          {dueDate && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ngày đến hạn đã chọn
                </span>
              </div>
              <div className="pl-4">
                <DueDatePicker dueDate={dueDate} onDateChange={handleDueDateChange} isCompleted={task?.isCompleted} />
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Mô tả
              </span>
            </div>
            <div className="pl-4">
              {isEditingDescription ? (
                <div className="space-y-3">
                  <textarea
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                    className="w-full min-h-[120px] p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
                    placeholder="Thêm mô tả chi tiết hơn..."
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveDescription}>
                      Lưu
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setIsEditingDescription(false);
                        setDescription(task?.description || "");
                      }}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[80px]"
                  onClick={() => setIsEditingDescription(true)}
                >
                  {description ? (
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {description}
                    </p>
                  ) : (
                    <p className="text-gray-400 dark:text-gray-500 italic">
                      Thêm mô tả chi tiết hơn...
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Checklist */}
          {task?.id && <Checklist taskId={task.id} />}

          {/* Attachments */}
          {task?.id && <Attachments taskId={task.id} />}
        </div>

        {/* Comments */}
        <div className="flex-3">
          <Comments />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
