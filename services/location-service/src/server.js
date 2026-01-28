require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initSocket } = require("./socket/index");
const redis = require("./redis/redis.client");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3005;

const server = app.listen(PORT, () => {
  console.log(`🌍 Location Service running on port ${PORT}`);
});

// Initialize Socket.IO
initSocket(server);
