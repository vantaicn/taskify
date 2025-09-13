const db = require('../../models/models');

const createChecklist = async (title, taskId, position) => {
  return await db.Checklist.create({ title, taskId, position });
}

const getChecklistsByTaskId = async (taskId) => {
  return await db.Checklist.findAll({ 
    where: { taskId }, 
    order: [['position', 'ASC']] 
  });
}

const getChecklistById = async (checklistId) => {
  return await db.Checklist.findByPk(checklistId);
}

const updateChecklist = async (checklistId, title, isCompleted) => {
  return await db.Checklist.update(
    { title, isCompleted }, 
    { where: { id: checklistId }, returning: true }
  );
}

const updateChecklistPosition = async (checklistId, position) => {
  return await db.Checklist.update(
    { position }, 
    { where: { id: checklistId }, returning: true }
  );
}

const deleteChecklistById = async (checklistId) => {
  return await db.Checklist.destroy({ where: { id: checklistId } });
}

module.exports = {
  createChecklist,
  getChecklistsByTaskId,
  getChecklistById,
  updateChecklist,
  updateChecklistPosition,
  deleteChecklistById,
}