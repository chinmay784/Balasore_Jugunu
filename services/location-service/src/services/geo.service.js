const redis = require("../redis/redis.client");

class GeoService {
  static async addDriverLocation(driverId, lat, lng) {
    await redis.geoadd("drivers", lng, lat, driverId);
  }

  static async removeDriver(driverId) {
    await redis.zrem("drivers", driverId);
  }

  static async getNearbyDrivers(lat, lng, radius = 5000) {
    // radius in meters
    return await redis.georadius("drivers", lng, lat, radius, "m", "WITHDIST");
  }
}

module.exports = GeoService;
