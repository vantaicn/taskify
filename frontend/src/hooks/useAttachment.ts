import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import attachmentApi from "../api/attachmentApi";
import type { CreateAttachmentPayload, UpdateAttachmentPayload } from "../types/attachment.types";
import { toast } from "sonner";

const useAttachment = (taskId: string) => {
  const queryClient = useQueryClient();

  const getAttachmentsQuery = useQuery({
    queryKey: ["task", taskId, "attachments"],
    queryFn: () => attachmentApi.getAttachments(taskId),
    enabled: !!taskId,
  });

  const getAttachmentByIdQuery = (attachmentId: string) => {
    return useQuery({
      queryKey: ["attachment", attachmentId],
      queryFn: () => attachmentApi.getAttachmentById(attachmentId),
      enabled: !!attachmentId,
    });
  };

  const createAttachmentMutation = useMutation({
    mutationFn: (data: CreateAttachmentPayload) => attachmentApi.createAttachment(taskId, data),
    onSuccess: () => {
      toast.success("File uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["task", taskId, "attachments"] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
    onError: (error: any) => {
      toast.error(`Error uploading file: ${error.response?.data?.error || error.message}`);
    },
  });

  const updateAttachmentMutation = useMutation({
    mutationFn: ({ attachmentId, data }: { attachmentId: string; data: UpdateAttachmentPayload }) =>
      attachmentApi.updateAttachment(attachmentId, data),
    onSuccess: (updatedAttachment) => {
      toast.success("Attachment updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["task", taskId, "attachments"] });
      queryClient.invalidateQueries({ queryKey: ["attachment", updatedAttachment.id] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
    onError: (error: any) => {
      toast.error(`Error updating attachment: ${error.response?.data?.error || error.message}`);
    },
  });

  const deleteAttachmentMutation = useMutation({
    mutationFn: (attachmentId: string) => attachmentApi.deleteAttachment(attachmentId),
    onSuccess: () => {
      toast.success("Attachment deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["task", taskId, "attachments"] });
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
    onError: (error: any) => {
      toast.error(`Error deleting attachment: ${error.response?.data?.error || error.message}`);
    },
  });

  const uploadFileMutation = useMutation({
    mutationFn: (file: File) => attachmentApi.uploadFile(file),
    onError: (error: any) => {
      toast.error(`Error uploading file: ${error.response?.data?.error || error.message}`);
    },
  });

  const uploadAndCreateAttachment = async (file: File) => {
    try {
      const uploadResult = await uploadFileMutation.mutateAsync(file);
      
      await createAttachmentMutation.mutateAsync({
        fileName: uploadResult.fileName,
        fileUrl: uploadResult.fileUrl,
        fileSize: uploadResult.fileSize,
        fileType: uploadResult.fileType,
      });
    } catch (error) {
      console.error("Error in upload and create process:", error);
    }
  };

  return {
    getAttachmentsQuery,
    getAttachmentByIdQuery,
    createAttachmentMutation,
    updateAttachmentMutation,
    deleteAttachmentMutation,
    uploadFileMutation,
    uploadAndCreateAttachment,
  };
};

export default useAttachment;