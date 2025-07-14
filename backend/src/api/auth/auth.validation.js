const Joi = require('joi');

const registerRequest = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  fullName: Joi.string().min(2).required(),
})

const loginRequest = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

module.exports = {
  registerRequest,
  loginRequest,
}