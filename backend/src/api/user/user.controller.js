const userService = require('./user.service');

const getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

const updateUser = async (req, res) => {
  const userId = req.user.id;
  const { email, name } = req.body;
  try {
    const updatedUser = await userService.updateUser(userId, { email, name });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

module.exports = {
  getUser,
  updateUser
}
