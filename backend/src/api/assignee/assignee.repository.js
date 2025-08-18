const db = require('../../models/models');

const addAssignee = async (taskId, userId) => {
  return await db.task_assignees.create({ taskId, userId });
}

const getAssigneesByTaskId = async (taskId) => {
  return await db.task_assignees.findAll({ where: { taskId } });
}

const deleteAssignee = async (taskId, assigneeId) => {
  return await db.task_assignees.destroy({ where: { taskId, id: assigneeId } });
}

module.exports = {
  addAssignee,
  getAssigneesByTaskId,
  deleteAssignee,
}