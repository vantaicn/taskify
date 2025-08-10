const db = require("../../db/sequelize");

const getBoardsByUserId = async (userId) => {
  return await db.Board.findAll({ where: { ownerId: userId } });
};

const getBoardById = async (boardId) => {
  return await db.Board.findByPk(boardId);
};

const createBoard = async (title, description, ownerId) => {
  return await db.Board.create({ title, description, ownerId });
};

const updateBoard = async (id, title, description) => {
  return await db.Board.update({ title, description }, { where: { id } });
};

const deleteBoardById = async (id) => {
  return await db.Board.destroy({ where: { id } });
};

module.exports = {
  getBoardsByUserId,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoardById,
};
