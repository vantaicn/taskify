const pool = require('../../config/db');

const createTask = async (title, listId, position) => {
  const query = `
    INSERT INTO tasks (title, list_id, position)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const result = await pool.query(query, [title, listId, position]);
  return result.rows[0];
}

const getTasksByListId = async (listId) => {
  const query = `
    SELECT *
    FROM tasks
    WHERE list_id = $1
    ORDER BY position
  `;
  const tasks = await pool.query(query, [listId]);
  return tasks.rows;
}

const getTaskById = async (taskId) => {
  const query = `
    SELECT *
    FROM tasks
    WHERE id = $1
  `;
  const task = await pool.query(query, [taskId]);
  return task.rows[0];
}

const updateTask = async (taskId, title) => {
  const query = `
    UPDATE tasks
    SET title = $1
    WHERE id = $2
    RETURNING *
  `;
  const { rows } = await pool.query(query, [title, taskId]);
  return rows[0];
}

const deleteTaskById = async (taskId) => {
  const query = `
    DELETE FROM tasks
    WHERE id = $1
  `;
  await pool.query(query, [taskId]);
  return { message: 'Task deleted successfully' };
}

const updateTaskPosition = async (taskId, position) => {
  const query = `
    UPDATE tasks
    SET position = $1
    WHERE id = $2
    RETURNING *
  `;
  const { rows } = await pool.query(query, [position, taskId]);
  return rows[0];
}

const moveTask = async (taskId, targetListId, position) => {
  const query = `
    UPDATE tasks
    SET list_id = $1, position = $2
    WHERE id = $3
    RETURNING *
  `;
  const { rows } = await pool.query(query, [targetListId, position, taskId]);
  return rows[0];
}

module.exports = {
  createTask,
  getTasksByListId,
  getTaskById,
  updateTask,
  deleteTaskById,
  updateTaskPosition,
  moveTask,
}