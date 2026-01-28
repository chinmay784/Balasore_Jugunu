const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //const conn = await mongoose.connect("mongodb://127.0.0.1:27017/user_service");
    const conn = await mongoose.connect("mongodb+srv://chinmaypuhan420_db_user:TCJ9lxyNk4kztMkf@cluster0.4vuvtae.mongodb.net/user_service");
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
