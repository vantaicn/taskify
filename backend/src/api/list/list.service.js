const listRepository = require('./list.repository');
const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require('../../utils/errors');

const createList = async (listData) => {
  const { title, boardId, position } = listData;
  try {
    const newList = await listRepository.createList(title, boardId, position);
    return newList.toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error creating list');
  }
}

const getListsByBoardId = async (boardId) => {
  try {
    const lists = await listRepository.getListsByBoardId(boardId);
    return lists.map(list => list.toJSON());
  } catch (error) {
    throw new InternalServerError(error.message || 'Error fetching lists');
  }
}

const getListById = async (listId) => {
  try {
    const list = await listRepository.getListById(listId);
    if (!list) {
      throw new NotFoundError('List not found');
    }
    return list.toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error fetching list by ID');
  }
}

const updateListTitle = async (listId, title) => {
  try {
    const result = await listRepository.updateListTitle(listId, title);
    if (result.affectedCount === 0) {
      throw new NotFoundError('List not found');
    }
    return result.affectedCount;
  } catch (error) {
    throw new InternalServerError(error.message || 'Error updating list');
  }
}

const updateListPosition = async (listId, position) => {
  try {
    const result = await listRepository.updateListPosition(listId, position);
    if (result.affectedCount === 0) {
      throw new NotFoundError('List not found');
    }
    return result.affectedCount;
  } catch (error) {
    throw new InternalServerError(error.message || 'Error updating list position');
  }
}


const deleteListById = async (listId) => {
  try {
    const deletedCount = await listRepository.deleteListById(listId);
    if (deletedCount === 0) {
      throw new NotFoundError('List not found');
    }
    return deletedCount;
  } catch (error) {
    throw new InternalServerError(error.message || 'Error deleting list');
  }
}

module.exports = {
  createList,
  getListsByBoardId,
  getListById,
  updateListTitle,
  updateListPosition,
  deleteListById,
}