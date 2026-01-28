require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`🔐 User Service running on port ${PORT}`));
