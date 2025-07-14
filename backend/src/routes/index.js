const express = require('express');
const authRoutes = require('../api/auth/auth.route');
const router = express.Router();

router.use('/auth', authRoutes);

module.exports = router;