const e = require("cors");
const authService = require("./auth.service");

const register = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await authService.register(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json({
      user: {
        id: result.id,
        email: result.email,
        fullName: result.name,
        avatarUrl: result.avatarUrl,
      },
      token: result.token,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
