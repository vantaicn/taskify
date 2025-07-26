const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const authValidation = require('./auth.validation');
const validateMiddleware = require('../../middlewares/validate.middleware');


router.post('/register', validateMiddleware(authValidation.registerRequest), authController.register);
router.post('/login', validateMiddleware(authValidation.loginRequest), authController.login);

module.exports = router;
