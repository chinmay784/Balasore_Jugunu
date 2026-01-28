const express = require("express");
const authRoutes = require("./routes/auth.routes");
const app = express();

app.use(express.json()); // This is fine HERE because this is the final destination.
app.use(authRoutes);

module.exports = app;