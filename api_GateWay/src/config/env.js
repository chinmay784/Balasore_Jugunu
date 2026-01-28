require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "supersecret",

  // Microservices URLs
  AUTH_SERVICE: process.env.AUTH_SERVICE || "http://localhost:3001",
  USER_SERVICE: process.env.USER_SERVICE || "http://localhost:3002",
  DRIVER_SERVICE: process.env.DRIVER_SERVICE || "http://localhost:3003",
  TRIP_SERVICE: process.env.TRIP_SERVICE || "http://localhost:3004",
  LOCATION_SERVICE: process.env.LOCATION_SERVICE || "http://localhost:3005",
  PAYMENT_SERVICE: process.env.PAYMENT_SERVICE || "http://localhost:3006",
  NOTIFICATION_SERVICE: process.env.NOTIFICATION_SERVICE || "http://localhost:3007",
};
