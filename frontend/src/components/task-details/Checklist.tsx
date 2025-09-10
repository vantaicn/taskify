import { useState } from "react";
import { CheckCircle2, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const Checklist = () => {

  const mockChecklist = [
    { id: "1", title: "Research competitor websites", isCompleted: true },
    { id: "2", title: "Create wireframes", isCompleted: true },
    { id: "3", title: "Design mockups", isCompleted: false },
    { id: "4", title: "Get approval from stakeholders", isCompleted: false },
  ];

  const [checklist, setChecklist] = useState(mockChecklist);

    const [newChecklistItem, setNewChecklistItem] = useState("");
    const [showAddChecklist, setShowAddChecklist] = useState(false);


  const toggleChecklistItem = (itemId: string) => {
    setChecklist(prev => prev.map(item =>
      item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      const newItem = {
        id: Date.now().toString(),
        title: newChecklistItem.trim(),
        isCompleted: false,
      };
      setChecklist(prev => [...prev, newItem]);
      setNewChecklistItem("");
      setShowAddChecklist(false);
    }
  };

    const completedChecklist = checklist.filter(item => item.isCompleted).length;
  const totalChecklist = checklist.length;
  const checklistProgress = totalChecklist > 0 ? (completedChecklist / totalChecklist) * 100 : 0;



  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Danh sách việc cần làm
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
        {checklist.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
          >
            <Checkbox
              checked={item.isCompleted}
              onCheckedChange={() => toggleChecklistItem(item.id)}
              className="flex-shrink-0"
            />
            <span
              className={`flex-1 text-sm ${
                item.isCompleted
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {item.title}
            </span>
          </div>
        ))}

        {showAddChecklist ? (
          <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
            <Input
              value={newChecklistItem}
              onChange={(e: any) => setNewChecklistItem(e.target.value)}
              placeholder="Thêm mục mới"
              className="flex-1"
              onKeyDown={(e: any) => e.key === "Enter" && addChecklistItem()}
              autoFocus
            />
            <Button size="sm" onClick={addChecklistItem}>
              Thêm
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAddChecklist(false)}
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
            Thêm mục
          </Button>
        )}
      </div>
    </div>
  );
};

export default Checklist;
