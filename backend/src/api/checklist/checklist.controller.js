const checklistService = require('./checklist.service');

const createChecklist = async (req, res) => {
  const { taskId } = req.params;
  const checklistData = req.body;
  try {
    const newChecklist = await checklistService.createChecklist({ ...checklistData, taskId });
    res.status(201).json(newChecklist);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const getChecklists = async (req, res) => {
  const { taskId } = req.params;
  try {
    const checklists = await checklistService.getChecklistsByTaskId(taskId);
    res.status(200).json(checklists);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const getChecklist = async (req, res) => {
  const { checklistId } = req.params;
  try {
    const checklist = await checklistService.getChecklistById(checklistId);
    res.status(200).json(checklist);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const updateChecklist = async (req, res) => {
  const { checklistId } = req.params;
  const { title, isCompleted } = req.body;
  console.log("Updating checklist:", { checklistId, title, isCompleted });
  try {
    const updatedChecklist = await checklistService.updateChecklist(checklistId, { title, isCompleted });
    res.status(200).json(updatedChecklist);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const updateChecklistPosition = async (req, res) => {
  const { checklistId } = req.params;
  const { position } = req.body;
  try {
    const updatedChecklist = await checklistService.updateChecklistPosition(checklistId, position);
    res.status(200).json(updatedChecklist);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const deleteChecklist = async (req, res) => {
  const { checklistId } = req.params;
  try {
    const deletedChecklist = await checklistService.getChecklistById(checklistId);
    const deletedCount = await checklistService.deleteChecklistById(checklistId);
    if (deletedCount > 0) {
      res.status(200).json({ 
        message: 'Checklist deleted successfully', 
        deletedChecklist 
      });
    } else {
      res.status(404).json({ error: 'Checklist not found' });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

module.exports = {
  createChecklist,
  getChecklists,
  getChecklist,
  updateChecklist,
  updateChecklistPosition,
  deleteChecklist,
}