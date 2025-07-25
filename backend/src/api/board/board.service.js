const e = require('express');
const boardRepository = require('./board.repository');

const getBoardsByUserId = async (userId) => {
  try {
    const boards = await boardRepository.getBoardsByUserId(userId);
    console.log('Fetched boards for user:', userId, 'Boards:', boards);
    return boards.map(board => ({
      id: board.id,
      title: board.title,
      description: board.description,
      owner: board.owner,
      createdAt: board.created_at,
    }))
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
    return {
      id: board.id,
      title: board.title,
      description: board.description,
      owner: board.owner,
      createdAt: board.created_at,
    };
  } catch (error) {
    throw new Error(error.message || 'Error fetching board by ID');
  }
}

const createBoard = async (boardData) => {
  try {
    const { title, description, owner } = boardData;
    const newBoard = await boardRepository.createBoard(title, description, owner);
    return {
      id: newBoard.id,
      title: newBoard.title,
      description: newBoard.description,
      owner: newBoard.owner,
      createdAt: newBoard.created_at,
    }
  } catch (error) {
    throw new Error(error.message || 'Error creating board');
  }
}

const updateBoard = async (id, title, description) => {
  try {
    const updatedBoard = await boardRepository.updateBoard(id, title, description);
    if (!updatedBoard) {
      throw new Error('Board not found or update failed');
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

const deleteBoardById = async (id) => {
  try {
    const result = await boardRepository.deleteBoardById(id);
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