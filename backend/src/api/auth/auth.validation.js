const Joi = require('joi');

const registerRequest = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
})

const loginRequest = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

module.exports = {
  registerRequest,
  loginRequest,
}