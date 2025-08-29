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
import useUnsplash from "@/hooks/useUnsplash";

const NewBoardButton = () => {
  const [boardData, setBoardData] = React.useState({
    title: "",
    description: "",
    backgroundUrl: "",
  });
  const [open, setOpen] = React.useState(false);

  const { createBoardMutation } = useBoards();
  const { useGetPhotos } = useUnsplash();
  const getPhotosQuery = useGetPhotos();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardData({ ...boardData, [e.target.id]: e.target.value });
  };

  const handleCreateBoard = async () => {
    await createBoardMutation.mutateAsync(boardData);
    setBoardData({ title: "", description: "", backgroundUrl: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Board
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-white/20 dark:border-gray-700/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Create New Board
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Create a new board to organize your tasks and collaborate with your
            team.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Board Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter board title..."
              value={boardData.title}
              onChange={handleInputChange}
              className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:border-primary/50 dark:focus:border-primary/50"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </Label>
            <Input
              id="description"
              placeholder="Describe what this board is for..."
              value={boardData.description}
              onChange={handleInputChange}
              className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 focus:border-primary/50 dark:focus:border-primary/50"
            />
          </div>
          <div>
            <Label
              htmlFor="backgroundImage"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Background
            </Label>
            <div className="mt-2 p-2 grid grid-cols-4 gap-2 max-h-50 overflow-y-auto">
              {getPhotosQuery.data?.map((photo: any) => (
                <img
                  key={photo.id}
                  src={photo.urls.regular}
                  alt="Unsplash"
                  className={"w-full h-full object-cover rounded-sm cursor-pointer" + (boardData.backgroundUrl === photo.urls.full ? " ring-2 ring-primary" : "")}
                  onClick={() => setBoardData({ ...boardData, backgroundUrl: photo.urls.full })}
                />
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="bg-white/50 dark:bg-gray-800/50"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleCreateBoard}
            disabled={!boardData.title.trim()}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewBoardButton;
