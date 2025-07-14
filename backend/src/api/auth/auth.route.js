const express = require('express');
const authController = require('./auth.controller');
const authValidation = require('./auth.validation');
const validateMiddleware = require('../../middlewares/validate.middleware');

const router = express.Router();

router.post('/register', validateMiddleware(authValidation.registerRequest), authController.register);
router.post('/login', validateMiddleware(authValidation.loginRequest), authController.login);

module.exports = router;
