const pool = require("../../db/pool");

const createList = async (title, boardId, position) => {
  const query = `
    INSERT INTO lists (title, board_id, position)
    VALUES ($1, $2, $3)
    RETURNING *
  `
  const result = await pool.query(query, [title, boardId, position]);
  return result.rows[0];
}

const getListsByBoardId = async (boardId) => {
  const query = `
    SELECT *
    FROM lists
    WHERE board_id = $1
    ORDER BY position
  `;
  const lists = await pool.query(query, [boardId]);
  return lists.rows;
}

const getListById = async (listId) => {
  const query = `
    SELECT *
    FROM lists
    WHERE ID = $1
  `;
  const list = await pool.query(query, [listId]);
  return list.rows[0];
}

const updateList = async (listId, title) => {
  const query = `
    UPDATE lists
    SET title = $1
    WHERE id = $2
    RETURNING *
  `;
  const { rows } = await pool.query(query, [title, listId]);
  return rows[0];
}

const deleteListById = async (listId) => {
  const query = `
    DELETE FROM lists
    WHERE id = $1
  `;
  await pool.query(query, [listId]);
  return { message: 'List deleted successfully' };
}

const updateListPosition = async (listId, position) => {
  const query = `
    UPDATE lists
    SET position = $1
    WHERE id = $2
    RETURNING *
  `;
  const { rows } = await pool.query(query, [position, listId]);
  return rows[0];
}

module.exports = {
  createList,
  getListsByBoardId,
  getListById,
  updateList,
  deleteListById,
  updateListPosition,
}