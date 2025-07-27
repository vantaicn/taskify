const taskRepository = require('./task.repository');

const createTask = async (taskData) => {
  try {
    const newTask = await taskRepository.createTask(taskData);
    return {
      id: newTask.id,
      title: newTask.title,
      listId: newTask.list_id,
      position: newTask.position,
    };
  } catch (error) {
    throw new Error(error.message || 'Error creating task');
  }
}

const getTasksByListId = async (listId) => {
  try {
    const tasks = await taskRepository.getTasksByListId(listId);
    return tasks.map(task => ({
      id: task.id,
      title: task.title,
      listId: task.list_id,
      position: task.position,
    }));
  } catch (error) {
    throw new Error(error.message || 'Error fetching tasks');
  }
}

const getTaskById = async (taskId) => {
  try {
    const task = await taskRepository.getTaskById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    return {
      id: task.id,
      title: task.title,
      listId: task.list_id,
      position: task.position,
    };
  } catch (error) {
    throw new Error(error.message || 'Error fetching task by ID');
  }
}

const updateTask = async (taskId, taskData) => {
  try {
    const updatedTask = await taskRepository.updateTask(taskId, taskData);
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    return {
      id: updatedTask.id,
      title: updatedTask.title,
      listId: updatedTask.list_id,
      position: updatedTask.position,
    };
  } catch (error) {
    throw new Error(error.message || 'Error updating task');
  }
}

const deleteTaskById = async (taskId) => {
  try {
    const response = await taskRepository.deleteTaskById(taskId);
    return response;
  } catch (error) {
    throw new Error(error.message || 'Error deleting task');
  }
}

const updateTaskPosition = async (taskId, position) => {
  try {
    const updatedTask = await taskRepository.updateTaskPosition(taskId, position);
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    return {
      id: updatedTask.id,
      title: updatedTask.title,
      listId: updatedTask.list_id,
      position: updatedTask.position,
    };
  } catch (error) {
    throw new Error(error.message || 'Error updating task position');
  }
}

const moveTask = async (taskId, targetListId, position) => {
  try {
    const movedTask = await taskRepository.moveTask(taskId, targetListId, position);
    if (!movedTask) {
      throw new Error('Task not found or move failed');
    }
    return {
      id: movedTask.id,
      title: movedTask.title,
      listId: movedTask.list_id,
      position: movedTask.position,
    };
  } catch (error) {
    throw new Error(error.message || 'Error moving task');
  }
}

module.exports = {
  createTask,
  getTasksByListId,
  getTaskById,
  updateTask,
  deleteTaskById,
  updateTaskPosition,
  moveTask,
};