const pool = require("../../db/pool");

const addMemberToBoard = async (boardId, userId, role = 'member') => {
  const query = `
    INSERT INTO board_members (board_id, user_id, role)
    VALUES ($1, $2, $3)
    RETURNING *
  `
  const { rows } = await pool.query(query, [boardId, userId, role]);
  return rows[0];
}

const getMemberByBoardId = async (boardId) => {
  const query = `
    SELECT *
    FROM board_members
    WHERE board_id = $1
  `;
  const { rows } = await pool.query(query, [boardId]);
  return rows;
}

const getAdminByBoardId = async (boardId) => {
  const query = `
    SELECT *
    FROM board_members
    WHERE board_id = $1 AND role = 'admin'
  `;
  const { rows } = await pool.query(query, [boardId]);
  return rows;
}

const getBoardByMemberId = async (memberId) => {
  const query = `
    SELECT *
    FROM board_members
    WHERE id = $1
  `;
  const { rows } = await pool.query(query, [memberId]);
  return rows[0];
}

const getMemberByBoardAndUserId = async (boardId, userId) => {
  const query = `
    SELECT *
    FROM board_members
    WHERE board_id = $1 AND user_id = $2
  `;
  const { rows } = await pool.query(query, [boardId, userId]);
  return rows[0];
}

const updateMemberRole = async (memberId, boardId, role) => {
  const query = `
    UPDATE board_members
    SET role = $1
    WHERE user_id = $2 AND board_id = $3
    RETURNING *
  `;
  const { rows } = await pool.query(query, [role, memberId, boardId]);
  return rows[0];
}

const deleteMemberById = async (memberId, boardId) => {
  const query = `
    DELETE FROM board_members
    WHERE user_id = $1 AND board_id = $2
  `;
  await pool.query(query, [memberId, boardId]);
  return { message: 'Member deleted successfully' };
}

module.exports = {
  addMemberToBoard,
  getMemberByBoardId,
  getAdminByBoardId,
  getBoardByMemberId,
  getMemberByBoardAndUserId,
  updateMemberRole,
  deleteMemberById,
}
