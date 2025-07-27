const e = require('express');
const listRepository = require('./list.repository');

const createList = async (listData) => {
  const { title, boardId, position } = listData;
  try {
    const newList = await listRepository.createList(title, boardId, position);
    return {
      id: newList.id,
      title: newList.title,
      boardId: newList.board_id,
      position: newList.position,
    };
  } catch (error) {
    throw new Error(error.message || 'Error creating list');
  }
}

const getListsByBoardId = async (boardId) => {
  try {
    const lists = await listRepository.getListsByBoardId(boardId);
    return lists.map(list => ({
      id: list.id,
      title: list.title,
      boardId: list.board_id,
      position: list.position,
    }));
  } catch (error) {
    throw new Error(error.message || 'Error fetching lists');
  }
}

const getListById = async (listId) => {
  try {
    const list = await listRepository.getListById(listId);
    if (!list) {
      throw new Error('List not found');
    }
    return {
      id: list.id,
      title: list.title,
      boardId: list.board_id,
      position: list.position,
    };
  } catch (error) {
    throw new Error(error.message || 'Error fetching list by ID');
  }
}

const updateList = async (listId, title) => {
  try {
    const updatedList = await listRepository.updateList(listId, title);
    if (!updatedList) {
      throw new Error('List not found');
    }
    return {
      id: updatedList.id,
      title: updatedList.title,
      boardId: updatedList.board_id,
      position: updatedList.position,
    };
  } catch (error) {
    throw new Error(error.message || 'Error updating list');
  }
}

const deleteListById = async (listId) => {
  try {
    await listRepository.deleteListById(listId);
    return { message: 'List deleted successfully' };
  } catch (error) {
    throw new Error(error.message || 'Error deleting list');
  }
}

const updateListPosition = async (listId, position) => {
  try {
    const updatedList = await listRepository.updateListPosition(listId, position);
    if (!updatedList) {
      throw new Error('List not found');
    }
    return {
      id: updatedList.id,
      title: updatedList.title,
      boardId: updatedList.board_id,
      position: updatedList.position,
    };
  } catch (error) {
    throw new Error(error.message || 'Error updating list position');
  }
}

module.exports = {
  createList,
  getListsByBoardId,
  getListById,
  updateList,
  deleteListById,
  updateListPosition,
}