const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const { PORT } = require("./config/env");

const server = http.createServer(app);

// Socket.IO for real-time location updates
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Client connected to API Gateway Socket.IO");

  // Example: subscribe to driver location
  socket.on("subscribeLocation", (userId) => {
    console.log(`User subscribed to location: ${userId}`);
    socket.join(userId);
  });

  // Forward GPS updates to subscribers
  socket.on("gps-update", (data) => {
    if (data.userId) io.to(data.userId).emit("gps-update", data);
  });
});

server.listen(PORT, () => {
  console.log(`🌐 API Gateway running on port ${PORT}`);
});
