const pool = require("../../db/pool");

const getBoardsByUserId = async (userId) => {
  const query = `
    SELECT *
    FROM boards
    WHERE owner = $1
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows;
}

const getBoardById = async (boardId) => {
  const query = `
    SELECT *
    FROM boards
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [boardId]);
  return rows[0];
}

const createBoard = async (title, description, owner) => {
  const query = `
    INSERT INTO boards (title, description, owner)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [title, description, owner]);
  return rows[0];
}

const updateBoard = async (id, title, description) => {
  const query = `
    UPDATE boards
    SET title = $1, description = $2
    WHERE id = $3
    RETURNING *
  `;
  const { rows } = await pool.query(query, [title, description, id]);
  return rows[0];
}

const deleteBoardById = async (id) => {
  const query = `
    DELETE FROM boards
    WHERE id = $1
  `;
  await pool.query(query, [id]);
  return { message: 'Board deleted successfully' };
}

module.exports = {
  getBoardsByUserId,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoardById,
};