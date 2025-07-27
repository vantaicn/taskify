const assigneeRepository = require('./assignee.repository');

const addAssignee = async (taskId, userId) => {
  try {
    const newAssignee = await assigneeRepository.addAssignee(taskId, userId);
    return {
      id: newAssignee.id,
      taskId: newAssignee.task_id,
      userId: newAssignee.user_id,
    };
  } catch (error) {
    throw new Error('Error adding assignee');
  }
}

const getAssigneesByTaskId = async (taskId) => {
  try {
    const assignees = await assigneeRepository.getAssigneesByTaskId(taskId);
    return assignees.map(assignee => ({
      id: assignee.id,
      taskId: assignee.task_id,
      userId: assignee.user_id,
    }));
  } catch (error) {
    throw new Error('Error fetching assignees');
  }
}

const deleteAssignee = async (taskId, assigneeId) => {
  try {
    await assigneeRepository.deleteAssignee(taskId, assigneeId);
  } catch (error) {
    throw new Error('Error deleting assignee');
  }
}

module.exports = {
  addAssignee,
  getAssigneesByTaskId,
  deleteAssignee,
}