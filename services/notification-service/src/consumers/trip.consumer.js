const { Kafka } = require('kafkajs');
const NotificationService = require('../services/notification.service');

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'notification-group' });

class TripConsumer {
  static async start() {
    await consumer.connect();
    await consumer.subscribe({ topic: 'trip-events', fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const event = JSON.parse(message.value.toString());
        console.log('📥 Received Event:', event);

        if (event.type === 'TRIP_ASSIGNED') {
          // Send push notification to driver and customer
          await NotificationService.sendPushNotification(
            event.driverToken,
            'New Trip Assigned',
            `Trip ID: ${event.tripId}`,
            { tripId: event.tripId }
          );

          await NotificationService.sendPushNotification(
            event.customerToken,
            'Driver on the way',
            `Your driver ${event.driverName} is coming`,
            { tripId: event.tripId }
          );
        }
      }
    });
  }
}

module.exports = TripConsumer;
