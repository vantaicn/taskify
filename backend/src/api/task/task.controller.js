const taskService = require('./task.service');

const createTask = async (req, res) => {
  const { listId } = req.params;
  const taskData = req.body;
  try {
    const newTask = await taskService.createTask({ ...taskData, listId });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getTasks = async (req, res) => {
  const { listId } = req.params;
  try {
    const tasks = await taskService.getTasksByListId(listId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await taskService.getTaskById(taskId);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const taskData = req.body;
  try {
    const updatedTask = await taskService.updateTask(taskId, taskData);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const response = await taskService.deleteTaskById(taskId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateTaskPosition = async (req, res) => {
  const { taskId } = req.params;
  const { position } = req.body;
  try {
    const updatedTask = await taskService.updateTaskPosition(taskId, position);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const moveTask = async (req, res) => {
  const { taskId } = req.params;
  const { targetListId, position } = req.body;
  try {
    const movedTask = await taskService.moveTask(taskId, targetListId, position);
    res.status(200).json(movedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  updateTaskPosition,
  moveTask,
}