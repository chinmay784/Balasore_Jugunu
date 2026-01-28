const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const logger = require("./utils/logger");
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(logger);
app.use(rateLimiter);

// ❌ REMOVED: app.use(express.json()); 
// ❌ REMOVED: app.use(express.urlencoded());

// 1. Handle Proxies FIRST. 
// This keeps the request "stream" alive for the microservices.
app.use(routes); 

// 2. Auth Middleware check
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/auth")) return next();
  const authMiddleware = require("./middlewares/auth.middleware");
  authMiddleware(req, res, next);
});

// 3. ONLY parse JSON for local Gateway routes that are NOT proxied
// (If you add local routes later, put the parser here)

app.use(errorHandler);

module.exports = app;