const GeoService = require("../services/geo.service");

module.exports = (socket) => {
  console.log("🟢 Driver connected:", socket.id);

  socket.on("update-location", async (data) => {
    const { driverId, lat, lng } = data;
    if (!driverId || !lat || !lng) return;

    try {
      await GeoService.addDriverLocation(driverId, lat, lng);
      console.log(`📍 Updated location for driver ${driverId}: [${lat}, ${lng}]`);
      socket.emit("location-updated", { success: true });
    } catch (err) {
      console.error("❌ Error updating driver location:", err);
    }
  });

  socket.on("disconnect", async () => {
    console.log("🔴 Driver disconnected:", socket.id);
  });
};
