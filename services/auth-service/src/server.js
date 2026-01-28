// require('dotenv').config();
// const app = require('./app');
// const connectDB = require('./config/db');

// const PORT = process.env.PORT || 3001;

// (async () => {
//   await connectDB();

//   app.listen(PORT, "0.0.0.0",() => {
//     console.log(`🔐 Auth Service running on port ${PORT}`);
//   });
// })();
const app = require("./app");
const connectDB = require('./config/db');

(async () => {
  await connectDB();

  app.listen(3001,() => {
    console.log(`🔐 Auth Service running on port 3001`);
  });
})();