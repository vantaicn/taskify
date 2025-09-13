const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UPLOAD_FOLDERS = {
  AVATAR: 'taskify/users/avatars',
  TASK_ATTACHMENT: 'taskify/tasks/attachments',
  BOARD_BACKGROUND: 'taskify/boards/backgrounds',
  GENERAL: 'taskify/general'
};

const createCloudinaryStorage = (folder, resourceType = 'auto', allowRawFiles = false) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: folder,
      resource_type: (req, file) => {
        if (file.mimetype === 'application/pdf' || 
            file.mimetype.includes('document') ||
            file.mimetype.includes('spreadsheet') ||
            file.mimetype.includes('presentation') ||
            allowRawFiles) {
          return 'raw';
        }
        if (file.mimetype.startsWith('image/')) {
          return 'image';
        }
        if (file.mimetype.startsWith('video/')) {
          return 'video';
        }
        return 'auto';
      },
      transformation: (req, file) => {
        if (file.mimetype.startsWith('image/') && resourceType === 'image') {
          return [{ width: 1920, height: 1080, crop: 'limit', quality: 'auto' }];
        }
        return undefined;
      }
    },
  });
};

const avatarUpload = multer({
  storage: createCloudinaryStorage(UPLOAD_FOLDERS.AVATAR, 'image'),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit for avatars
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for avatars'), false);
    }
  }
});

const attachmentUpload = multer({
  storage: createCloudinaryStorage(UPLOAD_FOLDERS.TASK_ATTACHMENT, 'auto', true),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit for attachments
  },
  fileFilter: (req, file, cb) => {
    const blockedMimes = [
      'application/x-msdownload',
      'application/x-executable',
      'application/x-dosexec'
    ];
    
    const blockedExtensions = ['.exe', '.bat', '.cmd', '.com', '.scr', '.vbs', '.js'];
    const fileExtension = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf('.'));
    
    if (blockedMimes.includes(file.mimetype) || blockedExtensions.includes(fileExtension)) {
      cb(new Error('File type not allowed for security reasons'), false);
    } else {
      cb(null, true);
    }
  }
});

const boardBackgroundUpload = multer({
  storage: createCloudinaryStorage(UPLOAD_FOLDERS.BOARD_BACKGROUND, 'image'),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for board backgrounds
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for board backgrounds'), false);
    }
  }
});

const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Failed to delete file from Cloudinary: ${error.message}`);
  }
};

const extractPublicIdFromUrl = (url) => {
  const matches = url.match(/\/v\d+\/(.+)\.[^.]+$/);
  return matches ? matches[1] : null;
};

module.exports = {
  cloudinary,
  UPLOAD_FOLDERS,
  avatarUpload,
  attachmentUpload,
  boardBackgroundUpload,
  deleteFromCloudinary,
  extractPublicIdFromUrl,
  createCloudinaryStorage,
};