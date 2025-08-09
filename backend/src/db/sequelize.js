const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://vantaicn:12345@localhost:5432/taskify');

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;
