// const mongoose = require("mongoose");

// const driverSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, required: true, unique: true },
//     vehicleNumber: { type: String, required: true },
//     vehicleType: { type: String, enum: ["bike", "car", "scooter"], default: "car" },
//     location: {
//       type: { type: String, default: "Point" },
//       coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
//     },
//     isAvailable: { type: Boolean, default: false },
//     createdAt: { type: Date, default: Date.now }
//   },
//   { versionKey: false }
// );

// driverSchema.index({ location: "2dsphere" });

// module.exports = mongoose.model("Driver", driverSchema);



const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    // 🔗 Relation with User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    // 🧍 Driver Personal Info
    fullName: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true,
      unique: true
    },

    // profilePhoto: {
    //   type: String // S3 / Cloudinary URL
    // },

    // 🚗 Vehicle Details
    vehicle: {
      type: {
        type: String,
        enum: ["bike", "auto", "car"],
        required: true
      },

      brand: String,
      model: String,

      registrationNumber: {
        type: String,
        required: true,
        unique: true
      },

      color: String
    },

    // 📄 Documents
    // documents: {
    //   drivingLicense: {
    //     number: String,
    //     image: String,
    //     verified: { type: Boolean, default: false }
    //   },

    //   rc: {
    //     number: String,
    //     image: String,
    //     verified: { type: Boolean, default: false }
    //   },

    //   insurance: {
    //     image: String,
    //     expiryDate: Date,
    //     verified: { type: Boolean, default: false }
    //   }
    // },

    // 📍 Live Location (GeoJSON)
    // 🔒 LOCKED GEO LOCATION
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point"
      },
      coordinates: {
        type: [Number],
        required: true,
        default: [0, 0],
        validate: {
          validator: function (v) {
            return (
              Array.isArray(v) &&
              v.length === 2 &&
              Number.isFinite(v[0]) &&
              Number.isFinite(v[1])
            );
          },
          message: "Invalid GeoJSON coordinates"
        }
      }
    },

    // location: {
    //   type: {
    //     type: String,
    //     enum: ["Point"],
    //     default: "Point"
    //   },
    //   coordinates: {
    //     type: [Number],
    //     index: "2dsphere",
    //     required: false
    //   }
    // },


    // 🚦 Driver Status
    isOnline: {
      type: Boolean,
      default: false
    },

    isAvailable: {
      type: Boolean,
      default: false
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    // ⭐ Rating System
    rating: {
      type: Number,
      default: 5
    },

    totalTrips: {
      type: Number,
      default: 0
    },

    walletBalance: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// 📍 Geo index for nearby driver search
driverSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Driver", driverSchema);
