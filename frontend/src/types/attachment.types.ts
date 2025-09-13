export interface AttachmentType {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  fileType?: string;
  taskId: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  uploader?: {
    id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
  };
}

export interface CreateAttachmentPayload {
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  fileType?: string;
}

export interface UpdateAttachmentPayload {
  fileName: string;
}

export interface AttachmentUploadResponse {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  fileType?: string;
  taskId: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}