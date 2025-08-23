import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React from "react";
import useBoards from "@/hooks/useBoard";

const NewBoardButton = () => {
  const [boardData, setBoardData] = React.useState({
    title: "",
    description: "",
  });
  const [open, setOpen] = React.useState(false);

  const { createBoardMutation } = useBoards();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardData({ ...boardData, [e.target.id]: e.target.value });
  };

  const handleCreateBoard = async () => {
    await createBoardMutation.mutateAsync(boardData);
    setBoardData({ title: "", description: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4" />
          New Board
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New board</DialogTitle>
          <DialogDescription>
            Create a new board by filling out the details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3"
              value={boardData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              value={boardData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleCreateBoard}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewBoardButton;
