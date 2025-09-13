import axiosInstance from "@/lib/axios";
import type { CreateAttachmentPayload, UpdateAttachmentPayload } from "@/types/attachment.types";

const attachmentApi = {
  getAttachments: async (taskId: string) => {
    const response = await axiosInstance.get(`/tasks/${taskId}/attachments`);
    return response.data;
  },
  
  getAttachmentById: async (attachmentId: string) => {
    const response = await axiosInstance.get(`/attachments/${attachmentId}`);
    return response.data;
  },
  
  createAttachment: async (taskId: string, attachmentData: CreateAttachmentPayload) => {
    const response = await axiosInstance.post(`/tasks/${taskId}/attachments`, attachmentData);
    return response.data;
  },
  
  updateAttachment: async (attachmentId: string, data: UpdateAttachmentPayload) => {
    const response = await axiosInstance.patch(`/attachments/${attachmentId}`, data);
    return response.data;
  },
  
  deleteAttachment: async (attachmentId: string) => {
    const response = await axiosInstance.delete(`/attachments/${attachmentId}`);
    return response.data;
  },

  downloadAttachment: async (attachmentId: string) => {
    const response = await axiosInstance.get(`/attachments/${attachmentId}/download`, {
      responseType: 'blob'
    });
    return response;
  },
  
  // Upload file to Cloudinary
  uploadFile: async (file: File): Promise<{ fileUrl: string; fileName: string; fileSize: number; fileType: string }> => {
    const formData = new FormData();
    formData.append('attachment', file);
    
    const response = await axiosInstance.post('/upload/attachment', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return {
      fileUrl: response.data.fileUrl,
      fileName: response.data.fileName,
      fileSize: response.data.fileSize,
      fileType: response.data.fileType,
    };
  }
};

export default attachmentApi;