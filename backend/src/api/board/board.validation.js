const joi = require('joi');

const createBoardRequest = joi.object({
  title: joi.string().required(),
  description: joi.string().optional(),
})

const getBoardRequest = joi.object({
  id: joi.string().required(),
})

const updateBoardRequest = joi.object({
  id: joi.string().required(),
  title: joi.string().required(),
  description: joi.string().optional(),
})

const deleteBoardRequest = joi.object({
  id: joi.string().required(),
})

module.exports = {
  createBoardRequest,
  getBoardRequest,
  updateBoardRequest,
  deleteBoardRequest,
}