const pool = require('../../config/db');

const addAssignee = async (taskId, userId) => {
  const query = `
    INSERT INTO task_assignees (task_id, user_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  const result = await pool.query(query, [taskId, userId]);
  return result.rows[0];
}

const getAssigneesByTaskId = async (taskId) => {
  const query = `
    SELECT *
    FROM task_assignees
    WHERE task_id = $1
  `;
  const result = await pool.query(query, [taskId]);
  return result.rows;
}

const deleteAssignee = async (taskId, assigneeId) => {
  const query = `
    DELETE FROM task_assignees
    WHERE task_id = $1 AND id = $2
  `;
  await pool.query(query, [taskId, assigneeId]);
}

module.exports = {
  addAssignee,
  getAssigneesByTaskId,
  deleteAssignee,
}