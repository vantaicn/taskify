const pool = require("../../db/pool");

const createUser = async (email, password, fullName) => {
  const query = `
    INSERT INTO users (email, password, full_name)
    VALUES($1, $2, $3)
    RETURNING *
  `;
  const result = await pool.query(query, [email, password, fullName]);
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1
  `;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};
