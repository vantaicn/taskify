import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, MoreHorizontal, Send } from "lucide-react";

const TaskComments = () => {

    const mockComments = [
      {
        id: "1",
        user: { id: "1", fullName: "John Doe", email: "john@example.com" },
        content: "Tôi đã hoàn thành phần research competitor websites. Đã tìm được 5 trang web tương tự để tham khảo design patterns.",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "2", 
        user: { id: "2", fullName: "Jane Smith", email: "jane@example.com" },
        content: "Great work John! Tôi sẽ review research của bạn và bắt đầu làm wireframes. Có thể share link research document được không?",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        id: "3",
        user: { id: "1", fullName: "John Doe", email: "john@example.com" },
        content: "Sure! Tôi đã attach design_guidelines.pdf ở phía trên. Document có detail analysis của 5 competitors và key takeaways.",
        createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        updatedAt: new Date(Date.now() - 30 * 60 * 1000),
      },
    ];

  
  const [comments, setComments] = useState(mockComments);
    const [newComment, setNewComment] = useState("");


  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        user: { id: "current-user", fullName: "Current User", email: "current@example.com" },
        content: newComment.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setComments(prev => [...prev, comment]);
      setNewComment("");
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return "Vừa xong";
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    if (diffInDays < 7) return `${diffInDays} ngày trước`;
    
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Bình luận ({comments.length})
        </span>
      </div>

      {/* Add comment form */}
      <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Current User" />
          <AvatarFallback>CU</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e: any) => setNewComment(e.target.value)}
            placeholder="Viết bình luận... (Sử dụng @name để mention thành viên)"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none text-sm"
            onKeyDown={(e: any) => {
              if (e.key === "Enter" && e.ctrlKey) {
                addComment();
              }
            }}
          />
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Tip: Nhấn Ctrl + Enter để gửi nhanh
            </p>
            <Button
              size="sm"
              onClick={addComment}
              disabled={!newComment.trim()}
              className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
            >
              <Send className="w-3 h-3 mr-1" />
              Gửi
            </Button>
          </div>
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="group flex gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.user.fullName}`}
              />
              <AvatarFallback>
                {comment.user.fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {comment.user.fullName}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(comment.createdAt)}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal className="w-3 h-3" />
                </Button>
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {comment.content}
                </p>
              </div>
              {/* Reaction placeholder */}
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs text-gray-500 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  👍 Thích
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs text-gray-500 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  💬 Trả lời
                </Button>
              </div>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Chưa có bình luận nào</p>
            <p className="text-xs">
              Hãy là người đầu tiên thảo luận về task này
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskComments;
