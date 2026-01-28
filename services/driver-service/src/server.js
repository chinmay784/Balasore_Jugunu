require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const driverRoutes = require("./routes/driver.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Routes
app.use("/drivers", driverRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`🚗 Driver Service running on port ${PORT}`));
