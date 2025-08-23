
import BoardsCard from "./BoardsCard";
import type { BoardType } from "@/types/board.types";
import {Link} from "react-router-dom";

interface BoardsGridProps {
  boards: BoardType[];
  title: string;
}

const BoardsGrid = ({
  boards,
  title
}: BoardsGridProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      {/* Filter and Search */}
      

      {/* Grid */}
      <div className="grid overflow-y-auto h-55 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent hover:scrollbar-thumb-gray-300">
        {boards.map((board) => (
          <Link to={`/boards/${board.id}`} key={board.id}>
            <BoardsCard board={board} />
          </Link>
        ))}
      </div>

    </div>
  )
}

export default BoardsGrid;