import List from "@/components/board-details/List";

import { useEffect } from "react";

// import '...' character from lucide-react
import { MoreHorizontal, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const BoardDetailsPage = () => {
  useEffect(() => {}, []);

  const board = {
    id: "1",
    name: "Furniture Store",
  };

  const list = {
    id: "1",
    name: "Backend",
    tasks: [
      { id: "1", title: "Task 1", completed: false },
      { id: "2", title: "Task 2", completed: true },
    ],
  };
  
  return (
    <>
      {/* Header */}
      <div className="h-16 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-4">
        <h1 className="text-lg font-semibold">{board.name}</h1>
        <div className="item-end px-6 flex items-center gap-2">
          <Button variant="outline" className="text-sm text-gray-500">
            <UserPlus className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button variant="outline" className="text-sm text-gray-500 px-2">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Lists */}
      <div className="flex space-x-4 p-4">
        <List />
        <List />
      </div>
    </>
  );
};

export default BoardDetailsPage;
