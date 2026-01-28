const Driver = require("../models/Driver");

class AvailabilityService {
  static async setAvailability(driverId, isAvailable) {
    return await Driver.findByIdAndUpdate(driverId, { isAvailable }, { new: true });
  }

  static async updateLocation(driverId, lat, lng) {
    return await Driver.findByIdAndUpdate(
      driverId,
      { location: { type: "Point", coordinates: [lng, lat] } },
      { new: true }
    );
  }

  static async getAvailableDriversNearby(lat, lng, radiusInMeters = 5000) {
    return await Driver.find({
      isAvailable: true,
      location: {
        $nearSphere: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: radiusInMeters
        }
      }
    });
  }
}

module.exports = AvailabilityService;
