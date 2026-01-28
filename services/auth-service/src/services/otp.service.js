const redis = require('../config/redis');

exports.sendOtp = async (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await redis.setex(`otp:${phone}`, 300, otp); // 5 minutes

  console.log(`📲 OTP for ${phone}: ${otp}`); // integrate SMS gateway here

  return true;
};

exports.verifyOtp = async (phone, otp) => {
  const savedOtp = await redis.get(`otp:${phone}`);

  if (!savedOtp || savedOtp !== otp) return false;

  await redis.del(`otp:${phone}`);
  return true;
};
