const checklistRepository = require('./checklist.repository');
const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } = require('../../utils/errors');

const createChecklist = async (checklistData) => {
  try {
    const newChecklist = await checklistRepository.createChecklist(
      checklistData.title, 
      checklistData.taskId, 
      checklistData.position
    );
    return newChecklist.toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error creating checklist');
  }
}

const getChecklistsByTaskId = async (taskId) => {
  try {
    const checklists = await checklistRepository.getChecklistsByTaskId(taskId);
    return checklists.map(checklist => checklist.toJSON());
  } catch (error) {
    throw new InternalServerError(error.message || 'Error fetching checklists');
  }
}

const getChecklistById = async (checklistId) => {
  try {
    const checklist = await checklistRepository.getChecklistById(checklistId);
    if (!checklist) {
      throw new NotFoundError('Checklist not found');
    }
    return checklist.toJSON();
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError(error.message || 'Error fetching checklist by ID');
  }
}

const updateChecklist = async (checklistId, updateData) => {
  const { title, isCompleted } = updateData;
  try {
    const result = await checklistRepository.updateChecklist(checklistId, title, isCompleted);
    if (result[0] === 0) {
      throw new NotFoundError('Checklist not found');
    }
    return result[1][0].toJSON();
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError(error.message || 'Error updating checklist');
  }
}

const updateChecklistPosition = async (checklistId, position) => {
  try {
    const result = await checklistRepository.updateChecklistPosition(checklistId, position);
    if (result[0] === 0) {
      throw new NotFoundError('Checklist not found');
    }
    return result[1][0].toJSON();
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError(error.message || 'Error updating checklist position');
  }
}

const deleteChecklistById = async (checklistId) => {
  try {
    const deletedCount = await checklistRepository.deleteChecklistById(checklistId);
    if (deletedCount === 0) {
      throw new NotFoundError('Checklist not found');
    }
    return deletedCount;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new InternalServerError(error.message || 'Error deleting checklist');
  }
}

module.exports = {
  createChecklist,
  getChecklistsByTaskId,
  getChecklistById,
  updateChecklist,
  updateChecklistPosition,
  deleteChecklistById,
}