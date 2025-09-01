const userRepository = require('./user.repository');

const getUserById = async (userId) => {
  try {
    const user = await userRepository.findById(userId);
    return user.toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error fetching user');
  }
}

const updateUser = async (userId, data) => {
  try {
    const updatedUser = await userRepository.updateById(userId, data);
    return updatedUser.toJSON();
  } catch (error) {
    throw new InternalServerError(error.message || 'Error updating user');
  }
}

module.exports = {
  getUserById,
  updateUser
}
