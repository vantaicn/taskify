import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import type { BoardsListItem } from "@/types/board.types";

const BoardsCard = ({ board }: { board: BoardsListItem }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{board.title}</CardTitle>
        <p className="text-sm text-gray-600">{board.description}</p>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-400">Owner: {board.owner}</p>
      </CardFooter>
    </Card>
  );
};

export default BoardsCard;
