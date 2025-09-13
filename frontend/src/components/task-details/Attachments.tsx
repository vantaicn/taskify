import { useState, useRef } from "react";
import { Paperclip, Upload, Download, Edit2, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAttachment from "@/hooks/useAttachment";
import type { AttachmentType } from "@/types/attachment.types";

interface AttachmentsProps {
  taskId: string;
}

const Attachments = ({ taskId }: AttachmentsProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    getAttachmentsQuery,
    createAttachmentMutation,
    updateAttachmentMutation,
    deleteAttachmentMutation,
    uploadAndCreateAttachment,
  } = useAttachment(taskId);

  const attachments = getAttachmentsQuery.data || [];
  const isLoading = getAttachmentsQuery.isLoading;

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadAndCreateAttachment(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const startEditing = (attachmentId: string, currentName: string) => {
    setEditingId(attachmentId);
    setEditingName(currentName);
  };

  const saveEdit = () => {
    if (editingId && editingName.trim()) {
      updateAttachmentMutation.mutate({
        attachmentId: editingId,
        data: { fileName: editingName.trim() }
      });
      setEditingId(null);
      setEditingName("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = (attachmentId: string) => {
    if (confirm("Are you sure you want to delete this attachment?")) {
      deleteAttachmentMutation.mutate(attachmentId);
    }
  };

  const handleDownload = async (attachment: AttachmentType) => {
    try {
      const downloadUrl = `/api/attachments/${attachment.id}/download`;
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = attachment.fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      
      let fallbackUrl = attachment.fileUrl;
      
      if (attachment.fileUrl.includes('cloudinary.com')) {
        const isImage = attachment.fileType && attachment.fileType.startsWith('image/');
        if (isImage) {
          fallbackUrl = attachment.fileUrl.replace('/upload/', '/upload/fl_attachment/');
        }
      }
      
      const link = document.createElement('a');
      link.href = fallbackUrl;
      link.download = attachment.fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return "📄";

    if (fileType.startsWith("image/")) return "🖼️";
    if (fileType.includes("pdf")) return "📑";
    if (fileType.includes("word") || fileType.includes("document")) return "📃";
    if (fileType.includes("excel") || fileType.includes("spreadsheet")) return "📊";
    if (fileType.includes("powerpoint") || fileType.includes("presentation")) return "📽️";
    if (fileType.includes("zip") || fileType.includes("rar")) return "📦";

    return "📄";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Paperclip className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tệp đính kèm
          </span>
          {attachments.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {attachments.length}
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-2 pl-4">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading attachments...</div>
        ) : (
          <>
            {attachments.map((attachment: AttachmentType) => (
              <div
                key={attachment.id}
                className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 group"
              >
                <span className="text-lg">{getFileIcon(attachment.fileType)}</span>
                
                <div className="flex-1">
                  {editingId === attachment.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveEdit();
                          } else if (e.key === "Escape") {
                            cancelEdit();
                          }
                        }}
                        autoFocus
                        disabled={updateAttachmentMutation.isPending}
                      />
                      <Button 
                        size="sm" 
                        onClick={saveEdit}
                        disabled={updateAttachmentMutation.isPending || !editingName.trim()}
                      >
                        {updateAttachmentMutation.isPending ? "..." : "Lưu"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={cancelEdit}
                        disabled={updateAttachmentMutation.isPending}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {attachment.fileName}
                        </span>
                        {attachment.fileSize && (
                          <span className="text-xs text-gray-500">
                            ({formatFileSize(attachment.fileSize)})
                          </span>
                        )}
                      </div>
                      {attachment.uploader && (
                        <div className="text-xs text-gray-500">
                          Uploaded by {attachment.uploader.fullName} • {new Date(attachment.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {editingId !== attachment.id && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(attachment)}
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEditing(attachment.id, attachment.fileName)}
                      title="Edit name"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(attachment.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}

            {/* Upload button */}
            <div className="pt-2">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                disabled={createAttachmentMutation.isPending}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="border-dashed"
                disabled={isLoading || createAttachmentMutation.isPending}
              >
                <Upload className="w-4 h-4 mr-1" />
                {createAttachmentMutation.isPending ? "Uploading..." : "Thêm tệp"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Attachments;