const assigneeRepository = require('./assignee.repository');
const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require('../../utils/errors');

const addAssignee = async (taskId, userId) => {
  try {
    const newAssignee = await assigneeRepository.addAssignee(taskId, userId);
    return newAssignee.toJSON();
  } catch (error) {
    throw new InternalServerError(error.message);
  }
}

const getAssigneesByTaskId = async (taskId) => {
  try {
    const assignees = await assigneeRepository.getAssigneesByTaskId(taskId);
    return assignees.map(assignee => assignee.toJSON());
  } catch (error) {
    throw new InternalServerError(error.message);
  }
}

const deleteAssignee = async (taskId, userId) => {
  try {
    const deletedCount = await assigneeRepository.deleteAssignee(taskId, userId);
    if (deletedCount === 0) {
      throw new NotFoundError('Assignee not found');
    }
    return deletedCount;
  } catch (error) {
    throw new InternalServerError(error.message);
  }
}

module.exports = {
  addAssignee,
  getAssigneesByTaskId,
  deleteAssignee,
}