const User = require('../models/User');
const { sendOtp, verifyOtp } = require('../services/otp.service');
const { generateToken } = require('../utils/token');
const axios = require("axios")

exports.requestOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: 'Phone is required' });

  await sendOtp(phone);
  res.json({ success: true, message: 'OTP sent successfully' });
};

exports.verifyOtpAndLogin = async (req, res) => {
  const { phone, otp, role } = req.body;

  const isValid = await verifyOtp(phone, otp);
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  }

  // let user = await User.findOne({ phone });
  // if (!user) {
  //   user = await User.create({ phone, role });
  // }

  // CALL USERS SERVICE
  const userRes = await axios.post(
    "http://localhost:3002/users/find-or-create",
    { phone, role }
  );

  const user = userRes.data.user;

  const token = generateToken({
    userId: user._id,
    role: user.role,
  });

  res.json({
    success: true,
    token,
    user,
  });
};
