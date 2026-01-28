const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    vehicleNumber: { type: String, required: true },
    vehicleType: { type: String, enum: ["bike", "car", "scooter"], default: "car" },
    location: {
      type: { type: String, default: "Point" },
      coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
    },
    isAvailable: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

driverSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Driver", driverSchema);
