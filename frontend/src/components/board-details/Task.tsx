import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Calendar, User } from "lucide-react";
import type { TaskType } from "@/types/task.types";

export interface TaskProps {
  task: TaskType;
}

const Task = ({ task }: TaskProps) => {
  return (
    <Card className="group rounded-md p-0 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-700 border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500">
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <Checkbox
            className="
              mt-1 rounded-md bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-500
              opacity-0 pointer-events-none w-0
              group-hover:opacity-100 group-hover:pointer-events-auto group-hover:w-4
              data-[state=checked]:opacity-100 data-[state=checked]:w-4 data-[state=checked]:pointer-events-auto
              data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 data-[state=checked]:text-white
              transition-all duration-300 flex-shrink-0
              peer
            "
          />
          <h4 className="flex-1 text-sm text-gray-900 dark:text-gray-100 peer-data-[state=checked]:text-gray-500 dark:peer-data-[state=checked]:text-gray-400">
            {task.title}
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
        <div className="flex items-center justify-between px-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Due soon</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>Assigned</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;
