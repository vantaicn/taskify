
import BoardsCard from "./BoardsCard";
import type { BoardsListItem } from "@/types/board.types";
import {Link} from "react-router-dom";

interface BoardsGridProps {
  boards: BoardsListItem[];
  type: "guest" | "owner";

}

const BoardsGrid = ({
  boards,
  type
}: BoardsGridProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{type === "owner" ? "Your Boards" : "Guest Boards"}</h2>
      </div>

      {/* Filter and Search */}
      

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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