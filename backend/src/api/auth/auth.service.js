const bcrypt = require("bcryptjs");
const authRepository = require("./auth.repository");
const config = require("../../config");
const jwt = require("jsonwebtoken");
const zxcvbn = require("zxcvbn");

const register = async (userData) => {
  const { email, password, fullName } = userData;
  const existingUser = await authRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Validate password strength
  const passwordStrength = zxcvbn(password);
  if (passwordStrength.score < 3) {
    throw new Error("Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
  }

  const hashedPassword = await bcrypt.hash(password, config.hashSaltRounds);

  const newUser = await authRepository.createUser(
    email,
    hashedPassword,
    fullName
  );
  return {
    id: newUser.id,
    email: newUser.email,
    fullName: newUser.full_name,
  };
};

const login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email");
  } else {
    const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
  }

  const tokenPayload = {
    sub: user.id,
    email: user.email,
  };

  const token = jwt.sign(tokenPayload, config.jwt.secret, {
    expiresIn: config.jwt.expiration,
  });

  return {
    id: user.id,
    email: user.email,
    fullName: user.full_name,
    token: token,
  };
};

module.exports = {
  register,
  login,
};
