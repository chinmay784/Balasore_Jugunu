// const User = require("../models/User");

// class UserService {
//   static async createUser(data) {
//     const { phone, email , role } = data;

//     const existingUser = await User.findOne({
//       $or: [{ phone }, { email }]
//     });

//     // ✅ USER EXISTS
//     if (existingUser) {
//       return existingUser;
//     }

//     // ❌ USER DOES NOT EXIST → CREATE
//     existingUser = new User({
//       phone,
//       password: "otp_login",
//       role:role
//     });

//     return await existingUser.save();
//   }

//   static async getUserById(id) {
//     return await User.findById(id);
//   }

//   static async getAllUsers() {
//     return await User.find();
//   }

//   static async updateUser(id, data) {
//     const user = await User.findByIdAndUpdate(id, data, { new: true });
//     if (!user) throw new Error("User not found");
//     return user;
//   }

//   static async deleteUser(id) {
//     const user = await User.findByIdAndDelete(id);
//     if (!user) throw new Error("User not found");
//     return true;
//   }
// }

// module.exports = UserService;



const User = require("../models/User");

class UserService {

  // // 🔥 FIND OR CREATE USER (OTP FLOW)
  static async findOrCreate({ phone, email = null, role }) {
    let user = await User.findOne({
      $or: [
        { phone },
        ...(email ? [{ email }] : [])
      ]
    });

    // ✅ USER EXISTS → RETURN
    if (user) {
      return user;
    }

    // ❌ USER DOES NOT EXIST → CREATE
    user = new User({
      phone,
      email: email || `${phone}@otp.temp`,
      password: "otp_login",
      role
    });

    return await user.save();


    // let user = await User.findOne({ phone });

    // if (!user) {
    //   user = await User.create({ phone, role });
    // }

    // res.json({
    //   success: true,
    //   user
    // });

  }

  static async getUserById(id) {
    return await User.findById(id);
  }

  static async getAllUsers() {
    return await User.find();
  }

  static async updateUser(id, data) {
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    if (!user) throw new Error("User not found");
    return user;
  }

  static async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("User not found");
    return true;
  }
}

module.exports = UserService;
