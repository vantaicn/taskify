const {sequelize} = require('../../db/sequelize');
const boardRepository = require('./board.repository');
const memberService = require('../board_member/board_member.service');
const {NotFoundError, InternalServerError} = require('../../utils/errors');

const createBoard = async (boardData) => {
  try {
    // const newBoard = await sequelize.transaction(async (t) => {
      const { title, description, ownerId } = boardData;
      // const newBoard = await boardRepository.createBoard(title, description, ownerId, {transaction: t});
      // await memberService.addMemberToBoard(newBoard.id, ownerId, 'admin', {transaction: t});
    const newBoard = await boardRepository.createBoard(title, description, ownerId);
    await memberService.addMemberToBoard(newBoard.id, ownerId, 'admin');  
    return newBoard.toJSON();
    // })
    // return newBoard;
  } catch (error) {
    throw new InternalServerError(error.message || 'Error creating board');
  }
}

const getBoardsByUserId = async (userId) => {
  try {
    const boards = await boardRepository.getBoardsByUserId(userId);
    return boards.map(board => board.toJSON());
  } catch (error) {
    throw new InternalServerError(error.message || 'Error fetching boards by user ID');
  }
}

const getSharedBoardsByUserId = async (userId) => {
  try {
    const boards = await boardRepository.getSharedBoardsByUserId(userId);
    return boards.map(board => board.toJSON());
  } catch (error) {
    throw new InternalServerError(error.message || 'Error fetching shared boards by user ID');
  }
}

const getBoardById = async (boardId) => {
  try {
    const board = await boardRepository.getBoardById(boardId);
    if (!board) {
      throw new NotFoundError('Board not found');
    }
    return board.toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error fetching board by ID');
  }
}

const updateBoard = async (boardId, title, description) => {
  try {
    const result = await boardRepository.updateBoard(boardId, title, description);
    if (result.affectedCount === 0) {
      throw new NotFoundError('Board not found');
    }
    return result.affectedCount;
  } catch (error) {
    throw new InternalServerError(error.message || 'Error updating board');
  }
};

const deleteBoardById = async (boardId) => {
  try {
    const deletedCount = await boardRepository.deleteBoardById(boardId);
    if (deletedCount === 0) {
      throw new NotFoundError('Board not found');
    }
    return deletedCount;
  } catch (error) {
    throw new InternalServerError(error.message || 'Error deleting board');
  }
}

module.exports = {
  getBoardsByUserId,
  getSharedBoardsByUserId,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoardById,
};