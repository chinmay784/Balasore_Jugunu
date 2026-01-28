const PaymentService = require('../services/payment.service');

// Create payment
const createPayment = async (req, res) => {
  try {
    const { amount, currency, userId } = req.body;
    const payment = await PaymentService.createPayment(amount, currency, userId);
    res.json({ success: true, payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Verify payment (callback)
const verifyPayment = async (req, res) => {
  try {
    const { paymentId, signature } = req.body;
    const result = await PaymentService.verifyPayment(paymentId, signature);
    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createPayment, verifyPayment };
