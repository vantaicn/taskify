const jwt = require("jsonwebtoken");
const config = require("../config");

const authenticate = async (req, res, next) => {
  let token;
  if (
    req.header.authorization &&
    req.header.authorization.startWith("Bearer")
  ) {
    token = req.header.authorization.split("")[1];
  }
  if (!token) {
    throw new Error("Authentication token is missing");
  }
  const decoded = jwt.verify(token, config.jwt.secret);
  req.user = decoded;
  next();
};

module.exports = authenticate;
