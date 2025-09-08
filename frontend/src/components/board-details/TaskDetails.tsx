
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  FileText,
  Paperclip,
  Plus,
  X,
  Check,
  Tag,
  Users,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  CalendarDays,
  AlertCircle,
} from "lucide-react";
import type { TaskType } from "@/types/task.types";

interface TaskDetailsProps {
  task?: TaskType;
  onUpdate?: (taskData: any) => void;
  onClose?: () => void;
}

const TaskDetails = ({ task, onUpdate, onClose }: TaskDetailsProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [title, setTitle] = useState(task?.title || "Design new landing page");
  const [description, setDescription] = useState(
    task?.description || 
    "Create a modern, responsive landing page for the new product launch. Include hero section, features overview, and call-to-action."
  );
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [showAddChecklist, setShowAddChecklist] = useState(false);
  const [showAddLabel, setShowAddLabel] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");
  const [selectedLabelColor, setSelectedLabelColor] = useState("#3b82f6");

  // Mock data for demonstration
  const mockChecklist = [
    { id: "1", title: "Research competitor websites", isCompleted: true },
    { id: "2", title: "Create wireframes", isCompleted: true },
    { id: "3", title: "Design mockups", isCompleted: false },
    { id: "4", title: "Get approval from stakeholders", isCompleted: false },
  ];

  const mockLabels = [
    { id: "1", name: "Design", color: "#3b82f6" },
    { id: "2", name: "High Priority", color: "#ef4444" },
  ];

  const mockAssignees = [
    { id: "1", fullName: "John Doe", email: "john@example.com" },
    { id: "2", fullName: "Jane Smith", email: "jane@example.com" },
  ];

  const mockAttachments = [
    { id: "1", fileName: "design_guidelines.pdf", fileSize: 2048000, createdAt: new Date() },
    { id: "2", fileName: "mockup_v1.png", fileSize: 1024000, createdAt: new Date() },
  ];

  const [checklist, setChecklist] = useState(mockChecklist);
  const [labels, setLabels] = useState(mockLabels);

  const labelColors = [
    "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", 
    "#06b6d4", "#84cc16", "#f97316", "#ec4899", "#6b7280"
  ];

  const handleSaveTitle = () => {
    setIsEditingTitle(false);
    onUpdate?.({ title });
  };

  const handleSaveDescription = () => {
    setIsEditingDescription(false);
    onUpdate?.({ description });
  };

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

  const addLabel = () => {
    if (newLabelName.trim()) {
      const newLabel = {
        id: Date.now().toString(),
        name: newLabelName.trim(),
        color: selectedLabelColor,
      };
      setLabels(prev => [...prev, newLabel]);
      setNewLabelName("");
      setShowAddLabel(false);
    }
  };

  const removeLabel = (labelId: string) => {
    setLabels(prev => prev.filter(label => label.id !== labelId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const dueDate = new Date("2024-12-25");
  const isDueSoon = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const isOverdue = (date: Date) => {
    return new Date() > date;
  };

  const completedChecklist = checklist.filter(item => item.isCompleted).length;
  const totalChecklist = checklist.length;
  const checklistProgress = totalChecklist > 0 ? (completedChecklist / totalChecklist) * 100 : 0;

  return (
    <div className="flex flex-col max-h-[80vh] bg-white dark:bg-gray-900">
      {/* Header with close button */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          <div className="flex-1">
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <Input
                  value={title}
                  onChange={(e: any) => setTitle(e.target.value)}
                  onBlur={handleSaveTitle}
                  onKeyDown={(e: any) => e.key === "Enter" && handleSaveTitle()}
                  className="text-xl font-semibold border-0 bg-transparent p-0 focus-visible:ring-0"
                  autoFocus
                />
                <Button size="sm" variant="ghost" onClick={handleSaveTitle}>
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <h2 
                className="text-xl font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1 -mx-2 -my-1"
                onClick={() => setIsEditingTitle(true)}
              >
                {title}
              </h2>
            )}
          </div>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto">
        <div className="flex gap-6 p-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Labels */}
            {(labels.length > 0) || showAddLabel ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Nhãn</span>
                </div>
                <div className="flex flex-wrap gap-2">
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
                        placeholder="Tên nhãn"
                        className="h-8 w-32"
                        onKeyDown={(e: any) => e.key === "Enter" && addLabel()}
                      />
                      <div className="flex gap-1">
                        {labelColors.map((color) => (
                          <button
                            key={color}
                            className={`w-6 h-6 rounded-full border-2 ${selectedLabelColor === color ? 'border-gray-400' : 'border-transparent'}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setSelectedLabelColor(color)}
                          />
                        ))}
                      </div>
                      <Button size="sm" onClick={addLabel}>
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setShowAddLabel(false)}>
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
                      Thêm nhãn
                    </Button>
                  )}
                </div>
              </div>
            ) : null}

            {/* Description */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mô tả</span>
              </div>
              {isEditingDescription ? (
                <div className="space-y-3">
                  <textarea
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                    className="w-full min-h-[120px] p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Thêm mô tả chi tiết hơn..."
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveDescription}>
                      Lưu
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        setIsEditingDescription(false);
                        setDescription(task?.description || "");
                      }}
                    >
                      Hủy
                    </Button>
                  </div>
                </div>
              ) : (
                <div 
                  className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[80px]"
                  onClick={() => setIsEditingDescription(true)}
                >
                  {description ? (
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{description}</p>
                  ) : (
                    <p className="text-gray-400 dark:text-gray-500 italic">Thêm mô tả chi tiết hơn...</p>
                  )}
                </div>
              )}
            </div>

            {/* Checklist */}
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
                    <span className="text-xs text-gray-500">{Math.round(checklistProgress)}%</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {checklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                    <Checkbox
                      checked={item.isCompleted}
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                      className="flex-shrink-0"
                    />
                    <span 
                      className={`flex-1 text-sm ${
                        item.isCompleted 
                          ? 'line-through text-gray-500 dark:text-gray-400' 
                          : 'text-gray-700 dark:text-gray-300'
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
                    <Button size="sm" variant="ghost" onClick={() => setShowAddChecklist(false)}>
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

            {/* Attachments */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tệp đính kèm</span>
              </div>
              
              <div className="space-y-2">
                {mockAttachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {attachment.fileName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(attachment.fileSize)} • {formatDate(attachment.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-dashed"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Thêm tệp đính kèm
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-64 space-y-6">
            {/* Add to card section */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Thêm vào thẻ</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Thành viên
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Tag className="w-4 h-4 mr-2" />
                  Nhãn
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Checklist
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Ngày đến hạn
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Đính kèm
                </Button>
              </div>
            </div>

            <Separator />

            {/* Due Date */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Ngày đến hạn</h3>
              <div className={`flex items-center gap-2 p-2 rounded-md ${
                isOverdue(dueDate) 
                  ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
                  : isDueSoon(dueDate)
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                  : 'bg-gray-50 dark:bg-gray-800'
              }`}>
                {isOverdue(dueDate) ? (
                  <AlertCircle className="w-4 h-4 text-red-500" />
                ) : isDueSoon(dueDate) ? (
                  <Clock className="w-4 h-4 text-yellow-500" />
                ) : (
                  <Calendar className="w-4 h-4 text-gray-500" />
                )}
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    isOverdue(dueDate) 
                      ? 'text-red-700 dark:text-red-400' 
                      : isDueSoon(dueDate)
                      ? 'text-yellow-700 dark:text-yellow-400'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {formatDate(dueDate)}
                  </p>
                  {isOverdue(dueDate) && (
                    <p className="text-xs text-red-600 dark:text-red-400">Quá hạn</p>
                  )}
                  {isDueSoon(dueDate) && !isOverdue(dueDate) && (
                    <p className="text-xs text-yellow-600 dark:text-yellow-400">Sắp đến hạn</p>
                  )}
                </div>
              </div>
            </div>

            {/* Assignees */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Thành viên được phân công</h3>
              <div className="space-y-2">
                {mockAssignees.map((assignee) => (
                  <div key={assignee.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${assignee.fullName}`} />
                      <AvatarFallback>
                        {assignee.fullName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {assignee.fullName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {assignee.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity placeholder */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Hoạt động</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                Lịch sử hoạt động sẽ hiển thị ở đây...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
