// const router = require('express').Router();
// const {requestOtp ,verifyOtpAndLogin } = require('../controllers/auth.controller');


// router.use((req, res, next) => {
//   console.log("🔐 Auth Service:", req.method, req.originalUrl, req.body);
//   next();
// });


// router.post('/request-otp', requestOtp);
// router.post('/verify-otp', verifyOtpAndLogin);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { requestOtp, verifyOtpAndLogin } = require("../controllers/auth.controller");

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtpAndLogin);
router.get("/health", (req, res) => res.send("Auth Service is ALIVE"));

module.exports = router;
