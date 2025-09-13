const db = require('../../models/models');

const createAttachment = async (taskId, fileName, fileUrl, fileSize, fileType, uploadedBy) => {
  return await db.TaskAttachment.create({ 
    taskId, 
    fileName, 
    fileUrl, 
    fileSize, 
    fileType, 
    uploadedBy 
  });
}

const getAttachmentsByTaskId = async (taskId) => {
  return await db.TaskAttachment.findAll({ 
    where: { taskId },
    include: [
      {
        model: db.User,
        as: 'uploader',
        attributes: ['id', 'fullName', 'email', 'avatarUrl']
      }
    ],
    order: [['createdAt', 'DESC']] 
  });
}

const getAttachmentById = async (attachmentId) => {
  return await db.TaskAttachment.findByPk(attachmentId, {
    include: [
      {
        model: db.User,
        as: 'uploader',
        attributes: ['id', 'fullName', 'email', 'avatarUrl']
      },
      {
        model: db.Task,
        as: 'task',
        attributes: ['id', 'title']
      }
    ]
  });
}

const updateAttachment = async (attachmentId, fileName) => {
  return await db.TaskAttachment.update(
    { fileName }, 
    { 
      where: { id: attachmentId }, 
      returning: true 
    }
  );
}

const deleteAttachmentById = async (attachmentId) => {
  return await db.TaskAttachment.destroy({ where: { id: attachmentId } });
}

module.exports = {
  createAttachment,
  getAttachmentsByTaskId,
  getAttachmentById,
  updateAttachment,
  deleteAttachmentById,
}