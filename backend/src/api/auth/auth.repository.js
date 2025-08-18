const db = require('../../models/models');

const createUser = async (email, password, fullName) => {
  return await db.User.create({ email, password, fullName });
};

const findUserByEmail = async (email) => {
  return await db.User.findOne({ where: { email } });
};

module.exports = {
  createUser,
  findUserByEmail,
};
