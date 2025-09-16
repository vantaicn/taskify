const db = require('../../models/models');

const createTask = async (title, listId, position) => {
  return await db.Task.create({ title, listId, position });
}

const getTasksByListId = async (listId) => {
  return await db.Task.findAll({ where: { listId }, order: [['position', 'ASC']] });
}

const getTaskById = async (taskId) => {
  return await db.Task.findByPk(taskId, {
    include: [
      {
        model: db.User,
        as: 'assignees',
        attributes: ['id', 'name', 'avatarUrl']
      },
      {
        model: db.Checklist,
        as: 'checklists',
      },
      {
        model: db.TaskAttachment,
        as: 'attachments',
      }
    ]
  });
}

const updateTask = async (taskId, title, description, isCompleted, dueDate) => {
  return await db.Task.update({ title, description, isCompleted, dueDate }, { where: { id: taskId }, returning: true });
}

const updateTaskPosition = async (taskId, position) => {
  return await db.Task.update({ position }, { where: { id: taskId }, returning: true });
}

const moveTask = async (taskId, targetListId, position) => {
  return await db.Task.update({ listId: targetListId, position }, { where: { id: taskId }, returning: true });
}

const deleteTaskById = async (taskId) => {
  return await db.Task.destroy({ where: { id: taskId } });
}

module.exports = {
  createTask,
  getTasksByListId,
  getTaskById,
  updateTask,
  updateTaskPosition,
  moveTask,
  deleteTaskById,
}