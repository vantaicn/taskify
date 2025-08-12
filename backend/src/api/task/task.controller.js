const taskService = require('./task.service');

const createTask = async (req, res) => {
  const { listId } = req.params;
  const taskData = req.body;
  try {
    const newTask = await taskService.createTask({ ...taskData, listId });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const getTasks = async (req, res) => {
  const { listId } = req.params;
  try {
    const tasks = await taskService.getTasksByListId(listId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const getTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await taskService.getTaskById(taskId);
    res.status(200).json(task);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const updateTaskTitle = async (req, res) => {
  const { taskId } = req.params;
  const { title } = req.body;
  try {
    const updatedTask = await taskService.updateTaskTitle(taskId, title);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const deletedCount = await taskService.deleteTaskById(taskId);
    res.status(200).json({ message: `${deletedCount} task(s) deleted` });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const updateTaskPosition = async (req, res) => {
  const { taskId } = req.params;
  const { position } = req.body;
  try {
    const updatedCount = await taskService.updateTaskPosition(taskId, position);
    res.status(200).json({ message: `${updatedCount} task(s) updated` });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const moveTask = async (req, res) => {
  const { taskId } = req.params;
  const { targetListId, position } = req.body;
  try {
    const movedCount = await taskService.moveTask(taskId, targetListId, position);
    res.status(200).json({ message: `${movedCount} task(s) moved` });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTaskTitle,
  updateTaskPosition,
  moveTask,
  deleteTask,
}