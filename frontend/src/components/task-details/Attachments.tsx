import { Paperclip, FileText, Download, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const Attachments = () => {
  const mockAttachments = [
    {
      id: "1",
      fileName: "design_guidelines.pdf",
      fileSize: 2048000,
      createdAt: new Date(),
    },
    {
      id: "2",
      fileName: "mockup_v1.png",
      fileSize: 1024000,
      createdAt: new Date(),
    },
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Paperclip className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Tệp đính kèm
        </span>
      </div>

      <div className="space-y-2 pl-4">
        {mockAttachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
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
                {formatFileSize(attachment.fileSize)} •{" "}
                {formatDate(attachment.createdAt)}
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

        <Button variant="outline" size="sm" className="border-dashed">
          <Upload className="w-4 h-4 mr-1" />
          Thêm tệp đính kèm
        </Button>
      </div>
    </div>
  );
};

export default Attachments;
