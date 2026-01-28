const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    name: { type: String },
    email: { type: String },
    role: {
      type: String,
      enum: ["customer", "driver"],
      default: "customer"
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
