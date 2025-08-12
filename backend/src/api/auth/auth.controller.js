const e = require("cors");
const authService = require("./auth.service");

const register = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await authService.register(userData);
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
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
      message: "Login successful",
      user: result
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
