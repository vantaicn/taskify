const taskRepository = require('./task.repository');
const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError } = require('../../utils/errors');

const createTask = async (taskData) => {
  try {
    const newTask = await taskRepository.createTask(taskData.title, taskData.listId, taskData.position);
    return newTask.toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error creating task');
  }
}

const getTasksByListId = async (listId) => {
  try {
    const tasks = await taskRepository.getTasksByListId(listId);
    return tasks.map(task => task.toJSON());
  } catch (error) {
    throw new InternalServerError(error.message || 'Error fetching tasks');
  }
}

const getTaskById = async (taskId) => {
  try {
    const task = await taskRepository.getTaskById(taskId);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    return task.toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error fetching task by ID');
  }
}

const updateTask = async (taskId, updateData) => {
  const { title, description, isCompleted, dueDate } = updateData;
  try {
    const result = await taskRepository.updateTask(taskId, title, description, isCompleted, dueDate);
    if (result.affectedCount === 0) {
      throw new NotFoundError('Task not found');
    }
    return result[1][0].toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error updating task');
  }
}

const updateTaskPosition = async (taskId, position) => {
  try {
    const result = await taskRepository.updateTaskPosition(taskId, position);
    if (result.affectedCount === 0) {
      throw new NotFoundError('Task not found');
    }
    return result[1][0].toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error updating task position');
  }
}

const moveTask = async (taskId, targetListId, position) => {
  try {
    const result = await taskRepository.moveTask(taskId, targetListId, position);
    if (result.affectedCount === 0) {
      throw new NotFoundError('Task not found or move failed');
    }
    return result[1][0].toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error moving task');
  }
}

const deleteTaskById = async (taskId) => {
  try {
    const deletedCount = await taskRepository.deleteTaskById(taskId);
    if (deletedCount === 0) {
      throw new NotFoundError('Task not found');
    }
    return deletedCount;
  } catch (error) {
    throw new InternalServerError(error.message || 'Error deleting task');
  }
}

module.exports = {
  createTask,
  getTasksByListId,
  getTaskById,
  updateTask,
  updateTaskPosition,
  moveTask,
  deleteTaskById,
};