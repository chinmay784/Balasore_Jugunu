// const Driver = require("../models/Driver");
// const AvailabilityService = require("../services/availability.service");

// exports.createDriver = async (req, res) => {
//   try {
//     const driver = new Driver(req.body);
//     await driver.save();
//     res.status(201).json({ success: true, driver });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// exports.setAvailability = async (req, res) => {
//   try {
//     const { driverId, isAvailable } = req.body;
//     const driver = await AvailabilityService.setAvailability(driverId, isAvailable);
//     res.json({ success: true, driver });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// exports.updateLocation = async (req, res) => {
//   try {
//     const { driverId, lat, lng } = req.body;
//     const driver = await AvailabilityService.updateLocation(driverId, lat, lng);
//     res.json({ success: true, driver });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// exports.getNearbyDrivers = async (req, res) => {
//   try {
//     const { lat, lng, radius } = req.query;
//     const drivers = await AvailabilityService.getAvailableDriversNearby(
//       parseFloat(lat),
//       parseFloat(lng),
//       radius ? parseInt(radius) : 5000
//     );
//     res.json({ success: true, drivers });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };


const DriverService = require("../services/availability.service");
const Driver = require("../models/Driver")
exports.createDriver = async (req, res) => {
  try {
    const driver = await DriverService.createDriver(req.body);
    res.status(201).json({ success: true, driver });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getDriver = async (req, res) => {
  const driver = await DriverService.getDriverById(req.params.id);
  if (!driver) {
    return res.status(404).json({ success: false, message: "Driver not found" });
  }
  res.json({ success: true, driver });
};

exports.getDriverByUser = async (req, res) => {
  const driver = await DriverService.getDriverByUserId(req.params.userId);
  if (!driver) {
    return res.status(404).json({ success: false, message: "Driver not found" });
  }
  res.json({ success: true, driver });
};

exports.getAllDrivers = async (req, res) => {
  const drivers = await DriverService.getAllDrivers();
  res.json({ success: true, drivers });
};

exports.updateDriver = async (req, res) => {
  const driver = await DriverService.updateDriver(req.params.id, req.body);
  res.json({ success: true, driver });
};

exports.updateLocation = async (req, res) => {
  const { lng, lat } = req.body;



  const driver = await DriverService.updateLocation(
    req.params.id,
    lng,
    lat
  );
  res.json({ success: true, driver });
};

exports.findNearby = async (req, res) => {
  const { lng, lat } = req.query;
  const drivers = await DriverService.findNearbyDrivers(lng, lat);
  res.json({ success: true, drivers });
};

// 🔵 Go Online
exports.goOnline = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { isOnline: true },
      { new: true }
    );

    res.json({ success: true, driver });
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({
      success: false,
      message: "SErver error"
    })
  }
}

// ⚫ Go Offline
exports.goOffline = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { isOnline: false, isAvailable: false },
      { new: true }
    );

    res.json({ success: true, driver });
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({
      success: false,
      message: "SErver error"
    })
  }
}


// Available
exports.setAvailable = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { isAvailable: true },
      { new: true }
    );

    res.json({ success: true, driver });
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({
      success: false,
      message: "SErver error"
    })
  }
}


exports.setBusy = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { isAvailable: false },
      { new: true }
    );

    res.json({ success: true, driver });
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({
      success: false,
      message: "SErver error"
    })
  }
}


// ✅ Approve Driver
exports.approveDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { approvalStatus: "approved" },
      { new: true }
    );

    res.json({ success: true, driver });
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({
      success: false,
      message: "SErver error"
    })
  }
}

// ❌ Reject Driver
exports.rejectDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { approvalStatus: "rejected" },
      { new: true }
    );

    res.json({ success: true, driver });
  } catch (error) {
    console.log(error, error.message);
    return res.status(500).json({
      success: false,
      message: "SErver error"
    })
  }
}



// ⭐ Update Rating (Average)
exports.updateRating = async (req, res) => {
  const { rating } = req.body;

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: "Rating must be 1–5" });
  }

  const driver = await Driver.findById(req.params.id);
  if (!driver) return res.status(404).json({ message: "Driver not found" });

  // Average rating logic
  driver.rating =
    (driver.rating * driver.totalTrips + rating) / (driver.totalTrips + 1);

  driver.totalTrips += 1;

  await driver.save();

  res.json({ success: true, driver });
};
