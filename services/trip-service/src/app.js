const express = require("express");
const cors = require("cors");

const tripRoutes = require("./routes/trip.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/trips", tripRoutes);

module.exports = app;
