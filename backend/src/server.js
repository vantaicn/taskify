const express = require("express");
const cors = require("cors");
const config = require("./config");
const indexRoutes = require("./routes");
const {initDatabase}= require("./db/sequelize");

const app = express();
const PORT = config.port || 3000;

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api", indexRoutes);

(async () => {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
