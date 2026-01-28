const router = require("express").Router();
const controller = require("../controllers/trip.controller");

router.post("/request", controller.requestTrip);
router.put("/:tripId/accept", controller.acceptTrip);
router.put("/:tripId/start", controller.startTrip);
router.put("/:tripId/complete", controller.completeTrip);
router.get("/user/:userId", controller.getUserTrips);

module.exports = router;
