const e = require("cors");
const authService = require("./auth.service");

const register = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await authService.register(userData);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
      },
    });
  } catch (error) {
    if (error.message === "Email already exists") {
      res.status(400).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: result.id,
        email: result.email,
        fullName: result.fullName,
        token: result.token,
      },
    });
  } catch (error) {
    if (error.message) {
      res.status(401).json({
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
};

module.exports = {
  register,
  login,
};
