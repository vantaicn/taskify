const db = require("../../models/models");

const getBoardsByUserId = async (userId) => {
  return await db.Board.findAll({ where: { ownerId: userId }, order: [['createdAt', 'ASC']] });
};

const getSharedBoardsByUserId = async (userId) => {
  return await db.Board.findAll({
    // include: [
    //   {
    //     model: db.BoardMember,
    //     as: 'members',
    //     where: { userId },
    //     required: true
    //   }
    // ]
  });
};

const getBoardById = async (boardId) => {
  return await db.Board.findByPk(boardId, {
    include: [
      {
        model: db.List,
        as: 'lists',
        include: [
          {
            model: db.Task,
            as: 'tasks'
          }
        ]
      }
    ]
  });
};

const createBoard = async (title, description, backgroundUrl, ownerId, options = {}) => {
  return await db.Board.create({ title, description, backgroundUrl, ownerId }, options);
};

const updateBoard = async (id, title, description, backgroundUrl) => {
  return await db.Board.update({ title, description, backgroundUrl }, { where: { id } });
};

const deleteBoardById = async (id) => {
  return await db.Board.destroy({ where: { id } });
};

module.exports = {
  getBoardsByUserId,
  getSharedBoardsByUserId,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoardById,
};
