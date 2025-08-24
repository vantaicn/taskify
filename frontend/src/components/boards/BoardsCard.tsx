import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";

import type { BoardType } from "@/types/board.types";

const BoardsCard = ({ board }: { board: BoardType }) => {  
  return (
    <Card className="w-full h-32 group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 cursor-pointer border-0 bg-white dark:bg-gray-800">
      {/* Content */}
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
          {board.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="px-4 pb-4">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Recent</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>Team</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoardsCard;
