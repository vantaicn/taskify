const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const authRoutes = require('../api/auth/auth.route');
const boardRoutes = require('../api/board/board.route');

router.use('/auth', authRoutes);
router.use('/boards', authMiddleware, boardRoutes);

module.exports = router;