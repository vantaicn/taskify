const memberRepository = require('./member.repository');

const addMemberToBoard = async (boardId, userId, role) => {
  try {
    const newMember = await memberRepository.addMemberToBoard(boardId, userId, role);
    return {
      id: newMember.id,
      boardId: newMember.board_id,
      userId: newMember.user_id,
      role: newMember.role,
    };
  } catch (error) {
    throw new Error(error.message || 'Error adding member to board');
  }
}

const getMembersByBoardId = async (boardId) => {
  try {
    const result = await memberRepository.getMemberByBoardId(boardId);
    return result.map(item => ({
      userId: item.user_id,
      role: item.role,
    }));
  } catch (error) {
    throw new Error(error.message || 'Error fetching members by board ID');
  }
}

const getBoardByMemberId = async (memberId) => {
  try {
    const result = await memberRepository.getBoardByMemberId(memberId);
    return result.map(item => ({
      boardId: item.board_id,
    }));
  } catch (error) {
    throw new Error(error.message || 'Error fetching board by member ID');
  }
}

const isMemberOfBoard = async (boardId, userId) => {
  try {
    const member = await memberRepository.getMemberByBoardAndUserId(boardId, userId);
    return !!member;
  } catch (error) {
    throw new Error(error.message || 'Error checking if user is a member of the board');
  }
}

const isAdminOfBoard = async (boardId, userId) => {
  try {
    const member = await memberRepository.getMemberByBoardAndUserId(boardId, userId);
    return member && member.role === 'admin';
  } catch (error) {
    throw new Error(error.message || 'Error checking if user is an admin of the board');
  }
}

const isLastAdmin = async (boardId) => {
  try {
    const members = await memberRepository.getAdminByBoardId(boardId);
    return members.length === 1;
  } catch (error) {
    throw new Error(error.message || 'Error checking last admin');
  }
}

const updateMemberRole = async (memberId, role, currentUserId, boardId) => {
  try {
    const isLastAdminCheck = await isLastAdmin(boardId);
    if (currentUserId === memberId && isLastAdminCheck) {
      throw new Error('Board must have at least one admin');
    }
    const updatedMember = await memberRepository.updateMemberRole(memberId, boardId, role);
    if (!updatedMember) {
      throw new Error('Member not found');
    }
    return {
      id: updatedMember.id,
      boardId: updatedMember.board_id,
      userId: updatedMember.user_id,
      role: updatedMember.role,
    };
  } catch (error) {
    throw new Error(error.message || 'Error updating member role');
  }
}

const deleteMemberById = async (memberId, currentUserId, boardId) => {
  try {
    const admins = await memberRepository.getAdminByBoardId(boardId);

    if (admins.length === 1 && admins[0].user_id === memberId) {
      throw new Error('Board must have at least one admin');
    }

    if (!admins.some(admin => admin.user_id === currentUserId) && currentUserId !== memberId) {
      throw new Error('You do not have permission to delete this member');
    }
  
    const result = await memberRepository.deleteMemberById(memberId, boardId);
    return result;
  } catch (error) {
    throw new Error(error.message || 'Error deleting member');
  }
}

module.exports = {
  addMemberToBoard,
  getMembersByBoardId,
  getBoardByMemberId,
  updateMemberRole,
  deleteMemberById,
  isMemberOfBoard,
  isAdminOfBoard,
}