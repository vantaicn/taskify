const db = require("../../models/models");

const createList = async (title, boardId, position) => {
  return await db.List.create({ title, boardId, position });
}

const getListsByBoardId = async (boardId) => {
  return await db.List.findAll({ where: { boardId }, order: [['position', 'ASC']] });
}

const getListById = async (listId) => {
  return await db.List.findByPk(listId);
}

const updateListTitle = async (listId, title) => {
  return await db.List.update({ title }, { where: { id: listId } });
}

const updateListPosition = async (listId, position) => {
  return await db.List.update({ position }, { where: { id: listId } });
}

const deleteListById = async (listId) => {
  return await db.List.destroy({ where: { id: listId } });
}

module.exports = {
  createList,
  getListsByBoardId,
  getListById,
  updateListTitle,
  updateListPosition,
  deleteListById,
}