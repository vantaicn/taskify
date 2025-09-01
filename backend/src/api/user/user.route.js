const express = require('express');
const router = express.Router();
const memberController = require('./user.controller');

router.get('/', userController.getUser);
router.patch('/', userController.updateUser);

module.exports = router;
