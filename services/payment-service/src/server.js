require('dotenv').config();
const express = require('express');
const paymentRoutes = require('./routes/payment.routes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/payment', paymentRoutes);

// Health check
app.get('/', (req, res) => {
  res.send({ status: 'Payment Service Running' });
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`💰 Payment Service running on port ${PORT}`);
});
