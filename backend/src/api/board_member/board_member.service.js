const memberRepository = require('./board_member.repository');
const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require('../../utils/errors');

const addMemberToBoard = async (boardId, userId, role) => {
  try {
    const newMember = await memberRepository.addMemberToBoard(boardId, userId, role);
    return newMember.toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error adding member to board');
  }
}

const getMembersByBoardId = async (boardId) => {
  try {
    const members = await memberRepository.getMembersByBoardId(boardId);
    return members.map(member => member.toJSON());
  } catch (error) {
    throw new InternalServerError(error.message || 'Error fetching members by board ID');
  }
}

const getBoardsByMemberId = async (memberId) => {
  try {
    const boards = await memberRepository.getBoardsByMemberId(memberId);
    return boards.map(board => board.toJSON());
  } catch (error) {
    throw new InternalServerError(error.message || 'Error fetching boards by member ID');
  }
}

const isMemberOfBoard = async (boardId, userId) => {
  try {
    const row = await memberRepository.getRowByBoardAndUserId(boardId, userId);
    return !!row;
  } catch (error) {
    throw new InternalServerError(error.message || 'Error checking if user is a member of the board');
  }
}

const isAdminOfBoard = async (boardId, userId) => {
  try {
    const row = await memberRepository.getRowByBoardAndUserId(boardId, userId);
    return row && row.role === 'admin';
  } catch (error) {
    throw new InternalServerError(error.message || 'Error checking if user is an admin of the board');
  }
}

const isLastAdmin = async (boardId) => {
  try {
    const members = await memberRepository.getAdminsByBoardId(boardId);
    return members.length === 1;
  } catch (error) {
    throw new InternalServerError(error.message || 'Error checking last admin');
  }
}

const updateMemberRole = async (memberId, role, currentUserId, boardId, options) => {
  try {
    const isLastAdminCheck = await isLastAdmin(boardId);
    if (currentUserId === memberId && isLastAdminCheck) {
      throw new ConflictError('Board must have at least one admin');
    }
    const updateResult = await memberRepository.updateMemberRole(memberId, boardId, role, options);
    if (updateResult.affectedCount === 0) {
      throw new NotFoundError('Member not found');
    }
    return updateResult.affectedCount;
  } catch (error) {
    throw new InternalServerError(error.message || 'Error updating member role');
  }
}

const deleteMemberById = async (memberId, currentUserId, boardId) => {
  try {
    const admins = await memberRepository.getAdminsByBoardId(boardId);

    if (admins.length === 1 && admins[0].user_id === memberId) {
      throw new ConflictError('Board must have at least one admin');
    }

    if (!admins.some(admin => admin.user_id === currentUserId) && currentUserId !== memberId) {
      throw new ForbiddenError('You do not have permission to delete this member');
    }
  
    const deletedCount = await memberRepository.deleteMemberById(memberId, boardId);
    if (deletedCount === 0) {
      throw new NotFoundError('Member not found');
    }
    return deletedCount;
  } catch (error) {
    throw new InternalServerError(error.message || 'Error deleting member');
  }
}

module.exports = {
  addMemberToBoard,
  getMembersByBoardId,
  getBoardsByMemberId,
  updateMemberRole,
  deleteMemberById,
  isMemberOfBoard,
  isAdminOfBoard,
}