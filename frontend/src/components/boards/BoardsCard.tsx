import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import type { BoardType } from "@/types/board.types";

const BoardsCard = ({ board }: { board: BoardType }) => {
  return (
    <Card className="w-55">
      <CardHeader>
        <CardTitle>{board.title}</CardTitle>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  );
};

export default BoardsCard;
