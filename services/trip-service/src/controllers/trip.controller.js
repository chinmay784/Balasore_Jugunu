const Trip = require("../models/Trip");
const { findNearestDriver } = require("../services/autoAssign.service");

// 1️⃣ Request Trip
exports.requestTrip = async (req, res) => {
    const { userId, pickup, drop } = req.body;

    const trip = await Trip.create({
        userId,
        pickup,
        drop,
    });

    // 🔥 Auto assign driver
    const driver = await findNearestDriver(
        pickup.coordinates[1],
        pickup.coordinates[0]
    );

    if (driver) {
        trip.driverId = driver.driverId;
        trip.status = "assigned";
        await trip.save();

        // 🔔 Emit socket event (later)
        // io.to(driver.driverId).emit("trip-request", trip);
    }

    res.json({ success: true, trip });
};

// 2️⃣ Driver Accept Trip
exports.acceptTrip = async (req, res) => {
    const { tripId } = req.params;
    const { driverId } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.driverId = driverId;
    trip.status = "accepted";
    await trip.save();

    res.json({ success: true, trip });
};

// 3️⃣ Start Trip
exports.startTrip = async (req, res) => {
    const trip = await Trip.findByIdAndUpdate(
        req.params.tripId,
        { status: "started" },
        { new: true }
    );

    res.json({ success: true, trip });
};

// 4️⃣ Complete Trip
exports.completeTrip = async (req, res) => {
    const trip = await Trip.findByIdAndUpdate(
        req.params.tripId,
        { status: "completed" },
        { new: true }
    );

    res.json({ success: true, trip });
};

// 5️⃣ Get User Trips
exports.getUserTrips = async (req, res) => {
    const trips = await Trip.find({ userId: req.params.userId });
    res.json({ success: true, trips });
};
