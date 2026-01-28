const Driver = require("../models/Driver");
const AvailabilityService = require("../services/availability.service");

exports.createDriver = async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json({ success: true, driver });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.setAvailability = async (req, res) => {
  try {
    const { driverId, isAvailable } = req.body;
    const driver = await AvailabilityService.setAvailability(driverId, isAvailable);
    res.json({ success: true, driver });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { driverId, lat, lng } = req.body;
    const driver = await AvailabilityService.updateLocation(driverId, lat, lng);
    res.json({ success: true, driver });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getNearbyDrivers = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    const drivers = await AvailabilityService.getAvailableDriversNearby(
      parseFloat(lat),
      parseFloat(lng),
      radius ? parseInt(radius) : 5000
    );
    res.json({ success: true, drivers });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
