const db = require('../../models/models');

const addAssignee = async (taskId, userId) => {
  return await db.TaskAssignee.create({ taskId, userId });
}

const getAssigneesByTaskId = async (taskId) => {
  return await db.TaskAssignee.findAll({ where: { taskId }, include: { model: db.User, as: 'user' } });
}

const deleteAssignee = async (taskId, userId) => {
  return await db.TaskAssignee.destroy({ where: { taskId, userId } });
}

module.exports = {
  addAssignee,
  getAssigneesByTaskId,
  deleteAssignee,
}