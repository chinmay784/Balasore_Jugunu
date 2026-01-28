// const Redis = require('ioredis');

// // const redis = new Redis({
// //   host: "localhost",
// //   port: 6379,
// // });

// // const redis = new Redis({
// //   tls:{
// //     redis://red-d5stf3s9c44c739i0110:6379
// //   }
// // })

// redis.on('connect', () => {
//   console.log('✅ Redis connected (Auth Service)');
// });

// redis.on("error", (err) => {
//   console.error("❌ Redis error", err);
// });

// module.exports = redis;



// const Redis = require("ioredis");

// const redis = new Redis("redis://red-d5sttls9c44c739i9qh0:BjyazwodgtOP8a0Mndvu2RrpwAesq17b@red-d5sttls9c44c739i9qh0:6379", {
//   tls: {} // REQUIRED for Render
// });redis://red-d5stf3s9c44c739i0110:6379
// // redis://red-d5stf3s9c44c739i0110.render.com:6379

// redis.on("connect", () => {
//   console.log("✅ Redis connected");
// });

// redis.on("error", (err) => {
//   console.error("❌ Redis error", err);
// });

// module.exports = redis;


const Redis = require("ioredis");

const redis = new Redis(
  "redis://red-d5sttls9c44c739i9qh0:BjyazwodgtOP8a0Mndvu2RrpwAesq17b@red-d5sttls9c44c739i9qh0:6379",
  {
    tls: {
      rejectUnauthorized: false, // REQUIRED on Render
    },
    maxRetriesPerRequest: 5,
  }
);

redis.on("connect", () => {
  console.log("✅ Redis connected (TLS)");
});

redis.on("ready", () => {
  console.log("🟢 Redis ready");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

module.exports = redis;
