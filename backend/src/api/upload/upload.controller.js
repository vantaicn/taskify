const { 
  avatarUpload, 
  attachmentUpload, 
  boardBackgroundUpload,
  deleteFromCloudinary,
  extractPublicIdFromUrl,
  createCloudinaryStorage,
  UPLOAD_FOLDERS
} = require('../../services/cloudinary.service');
const { BadRequestError, InternalServerError } = require('../../utils/errors');
const multer = require('multer');

const uploadAvatar = (req, res) => {
  avatarUpload.single('avatar')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const result = {
        fileUrl: req.file.path,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        publicId: req.file.filename,
        uploadType: 'avatar'
      };

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

const uploadAttachment = (req, res) => {
  attachmentUpload.single('attachment')(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err.message);
      console.error('File info:', req.file || 'No file info');
      return res.status(400).json({ 
        error: err.message,
        details: 'Upload failed - check file type and size'
      });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      console.log('Upload successful:', {
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      });

      const result = {
        fileUrl: req.file.path,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        publicId: req.file.filename,
        uploadType: 'attachment'
      };

      res.status(200).json(result);
    } catch (error) {
      console.error('Response error:', error);
      res.status(500).json({ error: error.message });
    }
  });
};

const uploadBoardBackground = (req, res) => {
  boardBackgroundUpload.single('background')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const result = {
        fileUrl: req.file.path,
        fileName: req.file.originalname,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        publicId: req.file.filename,
        uploadType: 'board_background'
      };

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

const deleteFile = async (req, res) => {
  try {
    const { fileUrl, publicId } = req.body;

    if (!fileUrl && !publicId) {
      throw new BadRequestError('File URL or public ID is required');
    }

    let idToDelete = publicId;
    if (!idToDelete && fileUrl) {
      idToDelete = extractPublicIdFromUrl(fileUrl);
    }

    if (!idToDelete) {
      throw new BadRequestError('Could not extract public ID from file URL');
    }

    const result = await deleteFromCloudinary(idToDelete);
    
    if (result.result === 'ok') {
      res.status(200).json({ message: 'File deleted successfully', result });
    } else {
      throw new InternalServerError('Failed to delete file');
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const uploadMultipleFiles = (req, res) => {
  attachmentUpload.array('files', 10)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    try {
      const results = req.files.map(file => ({
        fileUrl: file.path,
        fileName: file.originalname,
        fileSize: file.size,
        fileType: file.mimetype,
        publicId: file.filename,
        uploadType: 'attachment'
      }));

      res.status(200).json({ files: results });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports = {
  uploadAvatar,
  uploadAttachment,
  uploadBoardBackground,
  deleteFile,
  uploadMultipleFiles,
};