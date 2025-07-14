require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8080,
  databaseUrl: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET || "default_secret",
    expiration: process.env.JWT_EXPIRATION || "1d",
  },
  hashSaltRounds: parseInt(process.env.HASH_SALT_ROUNDS, 10) || 10,
};
