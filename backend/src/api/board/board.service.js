const sequelize = require('../../../db/sequelize');
const boardRepository = require('./board.repository');
const memberService = require('../member/member.service');

const createBoard = async (boardData) => {
  try {
    const newBoard = await sequelize.transaction(async (t) => {
      const { title, description, ownerId } = boardData;
      const newBoard = await boardRepository.createBoard(title, description, ownerId, {transaction: t});
      memberService.addMemberToBoard(newBoard.id, ownerId, 'admin', {transaction: t});
      return newBoard;
    })
    return newBoard;
  } catch (error) {
    throw new Error(error.message || 'Error creating board');
  }
}

const getBoardsByUserId = async (userId) => {
  try {
    const boards = await boardRepository.getBoardsByUserId(userId);
    return boards;
  } catch (error) {
    throw new Error(error.message || 'Error fetching boards by user ID');
  }
}

const getBoardById = async (boardId) => {
  try {
    const board = await boardRepository.getBoardById(boardId);
    if (!board) {
      throw new Error('Board not found');
    }
    return board;
  } catch (error) {
    throw new Error(error.message || 'Error fetching board by ID');
  }
}

const updateBoard = async (boardId, title, description) => {
  try {
    const result = await boardRepository.updateBoard(boardId, title, description);
    if (result.affectedRows === 0) {
      throw new Error('Board not found or not updated');
    }
    return {
      id: updatedBoard.id,
      title: updatedBoard.title,
      description: updatedBoard.description,
      owner: updatedBoard.owner,
      createdAt: updatedBoard.created_at,
    };
  } catch (error) {
    throw new Error(error.message || 'Error updating board');
  }
};

const deleteBoardById = async (boardId) => {
  try {
    const board = await boardRepository.getBoardById(boardId);
    if (!board) {
      throw new Error('Board not found');
    }
    const result = await boardRepository.deleteBoardById(boardId);
    return result;
  } catch (error) {
    throw new Error(error.message || 'Error deleting board');
  }
}

module.exports = {
  getBoardsByUserId,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoardById,
};