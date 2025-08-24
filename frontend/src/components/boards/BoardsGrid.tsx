
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
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          {boards.length} {boards.length === 1 ? 'board' : 'boards'}
        </div>
      </div>

      {/* Grid */}
      {boards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No boards yet</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            {title === "Your Boards" 
              ? "Create your first board to start organizing your projects" 
              : "No boards have been shared with you yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-75 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent hover:scrollbar-thumb-gray-300">
          {boards.map((board) => (
            <Link to={`/boards/${board.id}`} key={board.id} className="group">
              <BoardsCard board={board} />
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default BoardsGrid;