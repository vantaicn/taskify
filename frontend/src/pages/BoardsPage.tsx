
import BoardsGrid from "@/components/boards/BoardsGrid";
import useBoard from "@/hooks/useBoard";

const BoardsPage = () => {
  const { getBoardsQuery, getSharedBoardsQuery } = useBoard();
  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent hover:scrollbar-thumb-gray-300 bg-gradient-to-br from-slate-50 to-blue-100 dark:from-gray-900 dark:to-slate-900">
      <div className="container mx-auto p-6 space-y-12 max-w-7xl md:px-10 lg:px-20 xl:px-30">
        {/* Your Boards Section */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
          <BoardsGrid
            boards={getBoardsQuery.data || []}
            title="Your Boards"
          />
        </div>

        {/* Shared Boards Section */}
        <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
          <BoardsGrid
            boards={getSharedBoardsQuery.data || []}
            title="Shared Boards"
          />
        </div>
      </div>
    </div>
  );
};

export default BoardsPage;