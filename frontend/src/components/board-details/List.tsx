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
import type { List as ListType } from "@/types/list.types";


export interface ListProps {
  list: ListType;
}

const List = ({list}: ListProps) => {
  const tasks = list.tasks;
  return (
    <Card className="w-64 bg-gray-100">
      <CardHeader>
        <CardTitle>Task List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-2">
        {/* {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))} */}
        <Button variant="outline" className="w-full mt-2">
          <Plus />
          Add Task
        </Button>
      </CardContent>
    </Card>
  );
};

export default List;
