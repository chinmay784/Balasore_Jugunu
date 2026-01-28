const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
  });
}

class NotificationService {
  static async sendPushNotification(token, title, body, data = {}) {
    try {
      const message = {
        token,
        notification: { title, body },
        data
      };
      const response = await admin.messaging().send(message);
      console.log('📩 Notification sent:', response);
      return response;
    } catch (err) {
      console.error('❌ Notification Error:', err);
      throw err;
    }
  }
}

module.exports = NotificationService;
