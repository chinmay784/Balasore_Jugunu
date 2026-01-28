const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, default: null },

    pickup: {
      type: { type: String, default: "Point" },
      coordinates: [Number], // [lng, lat]
    },

    drop: {
      type: { type: String, default: "Point" },
      coordinates: [Number],
    },

    status: {
      type: String,
      enum: ["requested", "assigned", "accepted", "started", "completed", "cancelled"],
      default: "requested",
    },

    fare: Number,
  },
  { timestamps: true }
);

tripSchema.index({ pickup: "2dsphere" });

module.exports = mongoose.model("Trip", tripSchema);
