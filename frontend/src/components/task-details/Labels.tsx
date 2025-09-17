import { useState } from "react";
import { Plus, Tag, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Labels = () => {
  const mockLabels = [
    { id: "1", name: "Design", color: "#3b82f6" },
    { id: "2", name: "High Priority", color: "#ef4444" },
  ];
  const [showAddLabel, setShowAddLabel] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");

  const [selectedLabelColor, setSelectedLabelColor] = useState("#3b82f6");
  const [labels, setLabels] = useState(mockLabels);

  const labelColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#ec4899",
    "#6b7280",
  ];

  const addLabel = () => {
    if (newLabelName.trim()) {
      const newLabel = {
        id: Date.now().toString(),
        name: newLabelName.trim(),
        color: selectedLabelColor,
      };
      setLabels((prev) => [...prev, newLabel]);
      setNewLabelName("");
      setShowAddLabel(false);
    }
  };

  const removeLabel = (labelId: string) => {
    setLabels((prev) => prev.filter((label) => label.id !== labelId));
  };

  return (
    <div>
      {labels.length > 0 || showAddLabel ? (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Labels
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pl-4">
            {labels.map((label) => (
              <Badge
                key={label.id}
                className="flex items-center gap-1 px-3 py-1 text-white font-medium"
                style={{ backgroundColor: label.color }}
              >
                {label.name}
                <button
                  onClick={() => removeLabel(label.id)}
                  className="ml-1 hover:bg-black/20 rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {showAddLabel ? (
              <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
                <Input
                  value={newLabelName}
                  onChange={(e: any) => setNewLabelName(e.target.value)}
                  placeholder="Label name"
                  className="h-8 w-32"
                  onKeyDown={(e: any) => e.key === "Enter" && addLabel()}
                />
                <div className="flex gap-1">
                  {labelColors.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full border-2 ${
                        selectedLabelColor === color
                          ? "border-gray-400"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedLabelColor(color)}
                    />
                  ))}
                </div>
                <Button size="sm" onClick={addLabel}>
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowAddLabel(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddLabel(true)}
                className="border-dashed"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Label
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Labels;
