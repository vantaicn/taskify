
import BoardsGrid from "@/components/boards/BoardsGrid";
import useBoards from "@/hooks/useBoards";

const BoardsPage = () => {
  const { getBoardsQuery, getSharedBoardsQuery } = useBoards();
  return (
    <div className="p-6 space-y-10">
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