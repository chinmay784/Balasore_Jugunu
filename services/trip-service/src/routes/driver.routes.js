const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driver.controller");

router.post("/", driverController.createDriver);
router.post("/availability", driverController.setAvailability);
router.post("/location", driverController.updateLocation);
router.get("/nearby", driverController.getNearbyDrivers);

module.exports = router;
