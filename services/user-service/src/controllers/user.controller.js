const UserService = require("../services/user.service");

exports.createUser = async (req, res) => {
  try {
    const { phone, email, role } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }

    const user = await UserService.findOrCreate({
      phone,
      email,
      role
    });

    res.status(200).json({
      success: true,
      user
    });
  } catch (err) {
    console.error("❌ findOrCreateUser error:", err.message);
    res.status(400).json({ message: err.message });
  }
};


exports.getUser = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json({ success: true, users });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await UserService.updateUser(req.params.id, req.body);
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
