const express = require('express');
const router = express.Router();
const { createPayment, verifyPayment } = require('../controllers/payment.controller');

// Create a payment
router.post('/create', createPayment);

// Verify payment callback
router.post('/verify', verifyPayment);

module.exports = router;
