const db = require('../../db/sequelize');

const addMemberToBoard = async (boardId, userId, role = 'member') => {
  return db.board_members.create({ boardId, userId, role });
}

const getMembersByBoardId = async (boardId) => {
  return db.board_members.findAll({ where: { boardId }, include: [{ model: db.users, as: 'user' }] });
}

const getAdminsByBoardId = async (boardId) => {
  return db.board_members.findAll({ where: { boardId, role: 'admin' }, include: [{ model: db.users, as: 'user' }] });
}

const getBoardsByMemberId = async (memberId) => {
  return db.board_members.findAll({ where: { userId: memberId }, include: [{ model: db.boards, as: 'board' }] });
}

const getRowByBoardAndUserId = async (boardId, userId) => {
  return db.board_members.findOne({ where: { boardId, userId } });
}

const updateMemberRole = async (memberId, boardId, role, options = {}) => {
  return db.board_members.update({ role }, { where: { id: memberId, boardId }, ...options });
}

const deleteMemberById = async (memberId, boardId) => {
  return db.board_members.destroy({ where: { id: memberId, boardId } });
}

module.exports = {
  addMemberToBoard,
  getMembersByBoardId,
  getAdminsByBoardId,
  getBoardsByMemberId,
  getRowByBoardAndUserId,
  updateMemberRole,
  deleteMemberById,
}
