const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const authRoutes = require('../api/auth/auth.route');
const boardRoutes = require('../api/board/board.route');
const { listFlatRoutes } = require('../api/list/list.route');
const { taskFlatRoutes } = require('../api/task/task.route');
const { checklistFlatRoutes } = require('../api/checklist/checklist.route');
const { attachmentFlatRoutes } = require('../api/attachment/attachment.route');
const uploadRoutes = require('../api/upload/upload.route');

router.use('/auth', authRoutes);
router.use('/boards', authMiddleware, boardRoutes);
router.use('/lists', authMiddleware, listFlatRoutes);
router.use('/tasks', authMiddleware, taskFlatRoutes);
router.use('/checklists', authMiddleware, checklistFlatRoutes);
router.use('/attachments', authMiddleware, attachmentFlatRoutes);
router.use('/upload', authMiddleware, uploadRoutes);

module.exports = router;