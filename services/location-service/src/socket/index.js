const { Server } = require("socket.io");
const socketConfig = require("../config/socket.config");
const socketHandlers = require("./handlers");

let io;

const initSocket = (server) => {
  io = new Server(server, socketConfig);
  io.on("connection", socketHandlers);
  console.log("🚀 Socket.IO initialized");
};

module.exports = { initSocket, io };
