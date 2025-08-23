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
import { Checkbox } from "@/components/ui/checkbox";
import { Edit } from "lucide-react";
import type { TaskType } from "@/types/task.types";

export interface TaskProps {
  task: TaskType;
}

const Task = ({ task }: TaskProps) => {
  return (
    <Card className="p-1 rounded-sm group">
      <CardContent className="text-sm justify-between items-center p-1 flex">
        <Checkbox
          className="
          mr-2 rounded-lg bg-gray-100 group
          pointer-events-none border-0 w-0
          group-hover:pointer-events-auto
          group-hover:w-4
          data-[state=checked]:w-4
          data-[state=checked]:pointer-events-auto
          data-[state=checked]:bg-emerald-500
          data-[state=checked]:border-emerald-500
          data-[state=checked]:text-white
          transition-all duration-400
          peer
        "
        />
        <div className="peer-data-[state=checked]:text-gray-500 flex-1">
          {task.title}
        </div>
        <div className="w-4 group-hover:w-0 peer-data-[state=checked]:w-0 transition-all duration-400"></div>
        <Button variant="ghost" className="hover:bg-white">
          <Edit
            className="
            p-0
            opacity-0 pointer-events-none
            group-hover:opacity-100 group-hover:pointer-events-auto
            transition-all duration-400
          "
          />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Task;
