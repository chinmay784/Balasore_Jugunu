// const express = require("express");
// const router = express.Router();
// const driverController = require("../controllers/driver.controller");

// router.post("/", driverController.createDriver);
// router.post("/availability", driverController.setAvailability);
// router.post("/location", driverController.updateLocation);
// router.get("/nearby", driverController.getNearbyDrivers);

// module.exports = router;



const express = require("express");
const router = express.Router();
const controller = require("../controllers/driver.controller");

router.post("/", controller.createDriver);
router.get("/", controller.getAllDrivers);
router.get("/nearby", controller.findNearby);
router.get("/user/:userId", controller.getDriverByUser);
router.get("/:id", controller.getDriver);
router.put("/:id", controller.updateDriver);
router.put("/:id/location", controller.updateLocation);



// 🔄 Status
router.put("/:id/online", controller.goOnline);
router.put("/:id/offline", controller.goOffline);
router.put("/:id/available", controller.setAvailable);
router.put("/:id/busy", controller.setBusy);

// 🛡️ Admin
router.put("/:id/approve", controller.approveDriver);
router.put("/:id/reject", controller.rejectDriver);

// ⭐ Rating
router.put("/:id/rating", controller.updateRating);

module.exports = router;
