const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const authRoutes = require('../api/auth/auth.route');
const boardRoutes = require('../api/board/board.route');
const { listFlatRoutes } = require('../api/list/list.route');
const { taskFlatRoutes } = require('../api/task/task.route');

router.use('/auth', authRoutes);
router.use('/boards', authMiddleware, boardRoutes);
router.use('/lists', authMiddleware, listFlatRoutes);
router.use('/tasks', authMiddleware, taskFlatRoutes);

module.exports = router;