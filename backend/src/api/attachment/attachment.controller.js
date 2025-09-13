const attachmentService = require('./attachment.service');

const createAttachment = async (req, res) => {
  const { taskId } = req.params;
  const attachmentData = req.body;
  const uploadedBy = req.user.id;
  
  try {
    const newAttachment = await attachmentService.createAttachment(taskId, attachmentData, uploadedBy);
    res.status(201).json(newAttachment);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const getAttachments = async (req, res) => {
  const { taskId } = req.params;
  
  try {
    const attachments = await attachmentService.getAttachmentsByTaskId(taskId);
    res.status(200).json(attachments);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const getAttachment = async (req, res) => {
  const { attachmentId } = req.params;
  
  try {
    const attachment = await attachmentService.getAttachmentById(attachmentId);
    res.status(200).json(attachment);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const updateAttachment = async (req, res) => {
  const { attachmentId } = req.params;
  const updateData = req.body;
  
  try {
    const updatedAttachment = await attachmentService.updateAttachment(attachmentId, updateData);
    res.status(200).json(updatedAttachment);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const deleteAttachment = async (req, res) => {
  const { attachmentId } = req.params;
  
  try {
    const result = await attachmentService.deleteAttachment(attachmentId);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const downloadAttachment = async (req, res) => {
  const { attachmentId } = req.params;
  
  try {
    const attachment = await attachmentService.getAttachmentById(attachmentId);
    
    if (!attachment) {
      return res.status(404).json({ error: 'Attachment not found' });
    }

    let downloadUrl = attachment.fileUrl;
    
    if (attachment.fileUrl.includes('cloudinary.com')) {
      const isImage = attachment.fileType && attachment.fileType.startsWith('image/');
      const isPdf = attachment.fileType === 'application/pdf';
      const isDocument = attachment.fileType && (
        attachment.fileType.includes('document') ||
        attachment.fileType.includes('spreadsheet') ||
        attachment.fileType.includes('presentation')
      );
      
      if (isImage) {
        downloadUrl = attachment.fileUrl.replace('/upload/', '/upload/fl_attachment/');
      } else if (isPdf || isDocument) {
        downloadUrl = attachment.fileUrl;
      } else {
        downloadUrl = attachment.fileUrl;
      }
    }

    res.setHeader('Content-Disposition', `attachment; filename="${attachment.fileName}"`);
    
    if (attachment.fileType === 'application/pdf') {
      res.setHeader('Content-Type', 'application/pdf');
    } else {
      res.setHeader('Content-Type', attachment.fileType || 'application/octet-stream');
    }
    
    res.setHeader('Cache-Control', 'no-cache');
    
    res.redirect(downloadUrl);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

module.exports = {
  createAttachment,
  getAttachments,
  getAttachment,
  updateAttachment,
  deleteAttachment,
  downloadAttachment,
}