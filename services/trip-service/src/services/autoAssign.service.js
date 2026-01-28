const redis = require("../config/redis");

const DRIVER_GEO_KEY = "drivers:geo";

exports.findNearestDriver = async (lat, lng) => {
  const drivers = await redis.geosearch(
    DRIVER_GEO_KEY,
    "FROMLONLAT",
    lng,
    lat,
    "BYRADIUS",
    5,
    "km",
    "WITHDIST",
    "COUNT",
    1
  );

  if (!drivers.length) return null;

  return {
    driverId: drivers[0][0],
    distance: drivers[0][1],
  };
};
