import { Card, CardTitle, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import type { BoardType } from "@/types/board.types";

const BoardsCard = ({ board }: { board: BoardType }) => {
  return (
    <Card className="group h-full p-0 gap-2 overflow-hidden rounded-md shadow transition cursor-pointer">
      <div
        className="relative h-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${board.backgroundUrl})` }}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
      </div>

      <CardFooter className="px-4 pb-2 text-sm font-medium">
        {board.title}
      </CardFooter>
    </Card>
  );
};

export default BoardsCard;
