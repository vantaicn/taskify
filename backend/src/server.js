const express = require("express");
const cors = require("cors");
const http = require('http');
const { initSocket } = require("./sockets/socket");
const config = require("./config");
const indexRoutes = require("./routes");
const { initDatabase } = require("./db/sequelize");

const app = express();
const server = http.createServer(app);
const io = initSocket(server);
const PORT = config.port || 5000;

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api", indexRoutes);

(async () => {
  await initDatabase();
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
