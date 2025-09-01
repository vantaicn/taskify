import React from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlus } from "lucide-react";
import useMember from "@/hooks/useMember";

interface AddMemberButtonProps {
  boardId?: string;
}

const AddMemberButton = ({ boardId }: AddMemberButtonProps) => {
  const { getMembersQuery, createMemberMutation } = useMember(boardId || "");

  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<"admin" | "member">("member");

  const handleAddMember = async () => {
    await createMemberMutation.mutateAsync({ email, role });
    setEmail("");
    setRole("member");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <UserPlus className="w-4 h-4 mr-1" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
        </DialogHeader>
        <div className="border-b space-y-4">
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Role</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Input
                type="text"
                placeholder="Select role"
                readOnly
                value={role}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setRole("admin")}>
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRole("member")}>
                Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div></div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAddMember}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberButton;
