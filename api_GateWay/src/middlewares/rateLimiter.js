const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // max 60 requests per window per IP
  message: "Too many requests, try again later."
});
