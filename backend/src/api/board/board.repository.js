const db = require("../../models/models");

const getBoardsByUserId = async (userId) => {
  return await db.Board.findAll({ where: { ownerId: userId } });
};

const getBoardById = async (boardId) => {
  return await db.Board.findByPk(boardId, {
    include: [
      {
        model: db.BoardMember,
        as: 'members',
        attributes: ['id', 'userId', 'role'],
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: ['id', 'email', 'fullName']
          }
        ]
      }
    ]
  });
};

const createBoard = async(title, description, ownerId, options = {}) => {
  return await db.Board.create({ title, description, ownerId }, options);
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
