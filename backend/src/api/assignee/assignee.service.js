const assigneeRepository = require('./assignee.repository');
const { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError, InternalServerError } = require('../../utils/errors');

const addAssignee = async (taskId, userId) => {
  try {
    const newAssignee = await assigneeRepository.addAssignee(taskId, userId);
    return newAssignee.toJSON();
  } catch (error) {
    throw new InternalServerError('Error adding assignee');
  }
}

const getAssigneesByTaskId = async (taskId) => {
  try {
    const assignees = await assigneeRepository.getAssigneesByTaskId(taskId);
    return assignees.map(assignee => assignee.toJSON());
  } catch (error) {
    throw new InternalServerError('Error fetching assignees');
  }
}

const deleteAssignee = async (taskId, assigneeId) => {
  try {
    const deletedCount = await assigneeRepository.deleteAssignee(taskId, assigneeId);
    if (deletedCount === 0) {
      throw new NotFoundError('Assignee not found');
    }
    return deletedCount;
  } catch (error) {
    throw new InternalServerError('Error deleting assignee');
  }
}

module.exports = {
  addAssignee,
  getAssigneesByTaskId,
  deleteAssignee,
}