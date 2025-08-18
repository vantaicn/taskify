
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


const Task = () => {
  return (
    <Card className="p-1 rounded-sm group">
      <CardContent className="text-sm justify-between items-center p-1 flex">
        <Checkbox className="
          mr-2 rounded-lg bg-gray-50 group
          hidden pointer-events-none
          group-hover:block group-hover:pointer-events-auto
          data-[state=checked]:block data-[state=checked]:pointer-events-auto
          data-[state=checked]:bg-emerald-500
          data-[state=checked]:border-emerald-500
          data-[state=checked]:text-white
          peer
        "/>
        <div className="peer-data-[state=checked]:text-gray-500">
          Task description goes here.
        </div>
        <Button variant="ghost" className="hover:bg-white">
          <Edit className="
            p-0
            opacity-0 pointer-events-none transition-opacity
            group-hover:opacity-100 group-hover:pointer-events-auto
          "/>
        </Button>
      </CardContent>
    </Card>
  )
}

export default Task;
