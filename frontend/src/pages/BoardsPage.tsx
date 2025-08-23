
import BoardsGrid from "@/components/boards/BoardsGrid";
import useBoard from "@/hooks/useBoard";

const BoardsPage = () => {
  const { getBoardsQuery, getSharedBoardsQuery } = useBoard();
  return (
    <div className="p-6 space-y-10 sm:mx-10 md:mx-20 lg:mx-20 xl:mx-35">
      <div>
        <BoardsGrid
          boards={getBoardsQuery.data || []}
          title="Your Boards"
        />
      </div>
      <div>
        <BoardsGrid
          boards={getSharedBoardsQuery.data || []}
          title="Shared Boards"
        />
      </div>
    </div>
  );
};

export default BoardsPage;