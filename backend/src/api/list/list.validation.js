const joi = require('joi');

const createListRequest = joi.object({
  title: joi.string().required(),
  boardId: joi.string().required(),
  position: joi.number().required(),
})

const getListsByBoardIdRequest = joi.object({
  boardId: joi.string().required(),
})

const getListByIdRequest = joi.object({
  listId: joi.string().required(),
})

const updateListRequest = joi.object({
  title: joi.string().required(),
  position: joi.number().required(),
})

const deleteListByIdRequest = joi.object({
  listId: joi.string().required(),
})

module.exports = {
  createListRequest,
  getListsByBoardIdRequest,
  getListByIdRequest,
  updateListRequest,
  deleteListByIdRequest,
}