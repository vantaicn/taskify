const db = require("../../models/models");

const addMemberToBoard = async (boardId, userId, role = "member") => {
  return db.BoardMember.create({ boardId, userId, role });
};

const getMembersByBoardId = async (boardId) => {
  return db.BoardMember.findAll({
    where: { boardId },
    include: [{ model: db.User, as: "user" }],
  });
};

const getAdminsByBoardId = async (boardId) => {
  return db.BoardMember.findAll({
    where: { boardId, role: "admin" },
    include: [{ model: db.User, as: "user" }],
  });
};

const getBoardsByMemberId = async (memberId) => {
  return db.BoardMember.findAll({
    where: { userId: memberId },
    include: [{ model: db.boards, as: "board" }],
  });
};

const getRowByBoardAndUserId = async (boardId, userId) => {
  return db.BoardMember.findOne({ where: { boardId, userId } });
};

const updateMemberRole = async (memberId, boardId, role, options = {}) => {
  return db.BoardMember.update(
    { role },
    { where: { id: memberId, boardId }, ...options }
  );
};

const deleteMemberById = async (memberId, boardId) => {
  return db.BoardMember.destroy({ where: { id: memberId, boardId } });
};

const getUserByEmail = async (email) => {
  return db.User.findOne({ where: { email } });
};

module.exports = {
  addMemberToBoard,
  getMembersByBoardId,
  getAdminsByBoardId,
  getBoardsByMemberId,
  getRowByBoardAndUserId,
  updateMemberRole,
  deleteMemberById,
  getUserByEmail,
};
