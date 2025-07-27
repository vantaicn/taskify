const assigneeService = require('./assignee.service');

const addAssignee = async (req, res) => {
  const { taskId } = req.params;
  const { userId } = req.body;
  try {
    const newAssignee = await assigneeService.addAssignee(taskId, userId);
    res.status(201).json(newAssignee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAssignees = async (req, res) => {
  const { taskId } = req.params;
  try {
    const assignees = await assigneeService.getAssigneesByTaskId(taskId);
    res.status(200).json(assignees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteAssignee = async (req, res) => {
  const { taskId, assigneeId } = req.params;
  try {
    await assigneeService.deleteAssignee(taskId, assigneeId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addAssignee,
  getAssignees,
  deleteAssignee,
}