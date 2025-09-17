import { useState } from "react";
import { CheckCircle2, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import useChecklist from "@/hooks/useChecklist";
import type { ChecklistType } from "@/types/checklist.types";

interface ChecklistProps {
  taskId: string;
  checklists: ChecklistType[];
  onChecklistAdded?: (taskId: string) => void;
  onChecklistUpdated?: (taskId: string) => void;
  onChecklistDeleted?: (taskId: string) => void;
}

const Checklist = ({
  taskId,
  checklists,
  onChecklistAdded,
  onChecklistUpdated,
  onChecklistDeleted,
}: ChecklistProps) => {
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [showAddChecklist, setShowAddChecklist] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const {
    createChecklistMutation,
    updateChecklistMutation,
    deleteChecklistMutation,
  } = useChecklist(taskId);

  const toggleChecklistItem = async (checklistId: string) => {
    const checklist = checklists.find(
      (item: ChecklistType) => item.id === checklistId
    );
    if (checklist) {
      await updateChecklistMutation.mutateAsync({
        checklistId,
        data: { isCompleted: !checklist.isCompleted },
      });
      onChecklistUpdated && onChecklistUpdated(taskId);
    }
  };

  const startEditing = (checklistId: string, currentTitle: string) => {
    setEditingId(checklistId);
    setEditingTitle(currentTitle);
  };

  const saveEdit = async () => {
    if (editingId && editingTitle.trim()) {
      await updateChecklistMutation.mutateAsync({
        checklistId: editingId,
        data: { title: editingTitle.trim() },
      });
      setEditingId(null);
      setEditingTitle("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const addChecklistItem = async () => {
    if (newChecklistItem.trim()) {
      await createChecklistMutation.mutateAsync({
        title: newChecklistItem.trim(),
        position: checklists.length,
      });
      setNewChecklistItem("");
      setShowAddChecklist(false);
      onChecklistAdded && onChecklistAdded(taskId);
    }
  };

  const handleDeleteChecklist = async (checklistId: string) => {
    await deleteChecklistMutation.mutateAsync(checklistId);
    onChecklistDeleted && onChecklistDeleted(taskId);
  };

  const completedChecklist = checklists.filter(
    (item: ChecklistType) => item.isCompleted
  ).length;
  const totalChecklist = checklists.length;
  const checklistProgress =
    totalChecklist > 0 ? (completedChecklist / totalChecklist) * 100 : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Checklist
          </span>
          {totalChecklist > 0 && (
            <Badge variant="secondary" className="ml-2">
              {completedChecklist}/{totalChecklist}
            </Badge>
          )}
        </div>
        {totalChecklist > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${checklistProgress}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {Math.round(checklistProgress)}%
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2 pl-4">
        {checklists.map((item: ChecklistType) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md group"
          >
            <Checkbox
              checked={item.isCompleted}
              onCheckedChange={() => toggleChecklistItem(item.id)}
              className="flex-shrink-0"
            />
            {editingId === item.id ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEdit();
                    } else if (e.key === "Escape") {
                      cancelEdit();
                    }
                  }}
                  autoFocus
                  disabled={updateChecklistMutation.isPending}
                />
                <Button
                  size="sm"
                  onClick={saveEdit}
                  disabled={
                    updateChecklistMutation.isPending || !editingTitle.trim()
                  }
                >
                  {updateChecklistMutation.isPending ? "..." : "Save"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={cancelEdit}
                  disabled={updateChecklistMutation.isPending}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <>
                <span
                  className={`flex-1 text-sm cursor-pointer ${
                    item.isCompleted
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onDoubleClick={() => startEditing(item.id, item.title)}
                  title="Double-click to edit"
                >
                  {item.title}
                </span>
                <button
                  onClick={() => handleDeleteChecklist(item.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                >
                  <X className="w-3 h-3 text-red-500" />
                </button>
              </>
            )}
          </div>
        ))}

        {showAddChecklist ? (
          <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
            <Input
              value={newChecklistItem}
              onChange={(e) => setNewChecklistItem(e.target.value)}
              placeholder="Add new item"
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && addChecklistItem()}
              autoFocus
              disabled={createChecklistMutation.isPending}
            />
            <Button
              size="sm"
              onClick={addChecklistItem}
              disabled={
                createChecklistMutation.isPending || !newChecklistItem.trim()
              }
            >
              {createChecklistMutation.isPending ? "..." : "Add"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAddChecklist(false)}
              disabled={createChecklistMutation.isPending}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddChecklist(true)}
            className="border-dashed"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Item
          </Button>
        )}
      </div>
    </div>
  );
};

export default Checklist;
