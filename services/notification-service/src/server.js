require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const TripConsumer = require('./consumers/trip.consumer');

app.get('/', (req, res) => {
  res.send({ status: 'Notification Service Running' });
});

// Start Kafka consumer
TripConsumer.start();

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`🔔 Notification Service running on port ${PORT}`);
});
