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

const List = () => {
  const tasks = [
    { id: "1", title: "Task 1", completed: false },
    { id: "2", title: "Task 2", completed: true },
    { id: "3", title: "Task 3", completed: false },
    { id: "4", title: "Task 4", completed: false },
    { id: "5", title: "Task 5", completed: false },
  ];
  return (
    <Card className="w-64 bg-gray-100">
      <CardHeader>
        <CardTitle>Task List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-2">
        {tasks.map((task) => (
          <Task key={task.id} title={task.title} completed={task.completed} />
        ))}
        <Button variant="outline" className="w-full mt-2">
          <Plus />
          Add Task
        </Button>
      </CardContent>
    </Card>
  );
};

export default List;
