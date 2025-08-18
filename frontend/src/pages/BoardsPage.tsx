
import BoardsGrid from "@/components/boards/BoardsGrid";

const boardsList = [
  {
    id: "1",
    title: "Board 1",
    description: "Description for Board 1",
    owner: "User 1"
  },
  {
    id: "2",
    title: "Board 2",
    description: "Description for Board 2",
    owner: "User 2"
  }
];

const BoardsPage = () => {
  return (
    <div className="p-6 space-y-10">
      <div>
        <BoardsGrid
          boards={boardsList}
          type="owner"
        />
      </div>
      <div>
        <BoardsGrid
          boards={boardsList}
          type="guest"
        />
      </div>
    </div>
  );
};

export default BoardsPage;