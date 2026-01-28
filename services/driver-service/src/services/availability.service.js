const Driver = require("../models/Driver");

class AvailabilityService {
  //   static async setAvailability(driverId, isAvailable) {
  //     return await Driver.findByIdAndUpdate(driverId, { isAvailable }, { new: true });
  //   }

  //   static async updateLocation(driverId, lat, lng) {
  //     return await Driver.findByIdAndUpdate(
  //       driverId,
  //       { location: { type: "Point", coordinates: [lng, lat] } },
  //       { new: true }
  //     );
  //   }

  //   static async getAvailableDriversNearby(lat, lng, radiusInMeters = 5000) {
  //     return await Driver.find({
  //       isAvailable: true,
  //       location: {
  //         $nearSphere: {
  //           $geometry: { type: "Point", coordinates: [lng, lat] },
  //           $maxDistance: radiusInMeters
  //         }
  //       }
  //     });
  //   }
  // }


  // 🔹 Create driver profile
  static async createDriver(data) {
    const existing = await Driver.findOne({ userId: data.userId });
    if (existing) {
      throw new Error("Driver already exists");
    }
    const driver = new Driver(data);
    return await driver.save();
  }

  // 🔹 Get driver by ID
  static async getDriverById(id) {
    return await Driver.findById(id).populate("userId");
  }

  // 🔹 Get driver by userId
  static async getDriverByUserId(userId) {
    return await Driver.findOne({ userId });
  }

  // 🔹 Get all drivers (Admin)
  static async getAllDrivers() {
    return await Driver.find();
  }

  // 🔹 Update driver
  static async updateDriver(id, data) {
    return await Driver.findByIdAndUpdate(id, data, { new: true });
  }

  // 🔹 Delete driver
  static async deleteDriver(id) {
    return await Driver.findByIdAndDelete(id);
  }

  // 🔹 Set online/offline
  static async setOnlineStatus(driverId, status) {
    return await Driver.findByIdAndUpdate(
      driverId,
      { isOnline: status },
      { new: true }
    );
  }

  // 🔹 Update live location
  static async updateLocation(driverId, latitude, longitude) {
    // 🔥 FORCE CONVERSION
    const lat = Number(latitude);
    const lng = Number(longitude);

    console.log("Parsed:", lat, lng); // debug once

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      throw new Error("Latitude & Longitude must be numbers");
    }

    return await Driver.findByIdAndUpdate(
      driverId,
      {
        $set: {
          location: {
            type: "Point",
            coordinates: [lng, lat] // [longitude, latitude]
          }
        }
      },
      {
        new: true,
        runValidators: true
      }
    );
  }

  // 🔹 Find nearby drivers (Geo query)
  static async findNearbyDrivers(lng, lat, distanceKm = 5) {
    return await Driver.find({
      isOnline: true,
      approvalStatus: "approved",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: distanceKm * 1000
        }
      }
    });
  }
}

module.exports = AvailabilityService;
