require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.generateToken = (payload) => {
  return jwt.sign(payload, "supersecret", {
    expiresIn: '7d',
  });
};
