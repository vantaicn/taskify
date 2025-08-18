const db = require('../../models/models');

const createTask = async (title, listId, position) => {
  return await db.Task.create({ title, listId, position });
}

const getTasksByListId = async (listId) => {
  return await db.Task.findAll({ where: { listId }, order: [['position', 'ASC']] });
}

const getTaskById = async (taskId) => {
  return await db.Task.findByPk(taskId);
}

const updateTaskTitle = async (taskId, title) => {
  return await db.Task.update({ title }, { where: { id: taskId } });
}

const updateTaskPosition = async (taskId, position) => {
  return await db.Task.update({ position }, { where: { id: taskId } });
}

const moveTask = async (taskId, targetListId, position) => {
  return await db.Task.update({ listId: targetListId, position }, { where: { id: taskId } });
}

const deleteTaskById = async (taskId) => {
  return await db.Task.destroy({ where: { id: taskId } });
}

module.exports = {
  createTask,
  getTasksByListId,
  getTaskById,
  updateTaskTitle,
  updateTaskPosition,
  moveTask,
  deleteTaskById,
}