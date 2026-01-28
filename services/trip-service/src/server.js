// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const driverRoutes = require("./routes/driver.routes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect MongoDB
// connectDB();

// // Routes
// app.use("/api/drivers", driverRoutes);

// const PORT = process.env.PORT || 3004;
// app.listen(PORT, () => console.log(`🚗 Driver Service running on port ${PORT}`));



const app = require("./app");
const connectDB = require("./config/db");

connectDB();

app.listen(3004, () =>
  console.log("🚕 Trip Service running on port 3004")
);
