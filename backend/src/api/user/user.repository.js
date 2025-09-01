const db = require('../../models/models');

const findById = async (userId) => {
  return db.User.findByPk(userId);
}

const updateById = async (userId, data) => {
  return db.User.update(data, { where: { id: userId } });
}

module.exports = {
  findById,
  updateById
}
