const mongoose = require("mongoose");

module.exports = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/auth_service");
    await mongoose.connect("mongodb+srv://chinmaypuhan420_db_user:6J8ygYNOAPYzGfy3@cluster0.2qzixhi.mongodb.net/auth_service")
    console.log("✅ MongoDB connected (Auth Service)");
  } catch (err) {
    console.error("❌ MongoDB error", err);
    process.exit(1);
  }
};

// 6J8ygYNOAPYzGfy3
// chinmaypuhan420_db_user