const attachmentRepository = require('./attachment.repository');
const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } = require('../../utils/errors');

const createAttachment = async (taskId, attachmentData, uploadedBy) => {
  const { fileName, fileUrl, fileSize, fileType } = attachmentData;
  
  if (!fileName || !fileUrl) {
    throw new BadRequestError('File name and file URL are required');
  }

  try {
    const newAttachment = await attachmentRepository.createAttachment(
      taskId, 
      fileName, 
      fileUrl, 
      fileSize, 
      fileType, 
      uploadedBy
    );
    return newAttachment.toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error creating attachment');
  }
}

const getAttachmentsByTaskId = async (taskId) => {
  try {
    const attachments = await attachmentRepository.getAttachmentsByTaskId(taskId);
    return attachments.map(attachment => attachment.toJSON());
  } catch (error) {
    throw new InternalServerError(error.message || 'Error fetching attachments');
  }
}

const getAttachmentById = async (attachmentId) => {
  try {
    const attachment = await attachmentRepository.getAttachmentById(attachmentId);
    if (!attachment) {
      throw new NotFoundError('Attachment not found');
    }
    return attachment.toJSON();
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError(error.message || 'Error fetching attachment by ID');
  }
}

const updateAttachment = async (attachmentId, updateData) => {
  const { fileName } = updateData;
  
  if (!fileName) {
    throw new BadRequestError('File name is required');
  }

  try {
    const result = await attachmentRepository.updateAttachment(attachmentId, fileName);
    if (result[0] === 0) {
      throw new NotFoundError('Attachment not found');
    }
    return result[1][0].toJSON();
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof BadRequestError) {
      throw error;
    }
    throw new InternalServerError(error.message || 'Error updating attachment');
  }
}

const deleteAttachment = async (attachmentId) => {
  try {
    const deletedCount = await attachmentRepository.deleteAttachmentById(attachmentId);
    if (deletedCount === 0) {
      throw new NotFoundError('Attachment not found');
    }
    return { message: 'Attachment deleted successfully' };
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError(error.message || 'Error deleting attachment');
  }
}

module.exports = {
  createAttachment,
  getAttachmentsByTaskId,
  getAttachmentById,
  updateAttachment,
  deleteAttachment,
}