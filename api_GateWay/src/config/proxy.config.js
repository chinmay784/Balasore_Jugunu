const { createProxyMiddleware, fixRequestBody } = require("http-proxy-middleware");
const {
  AUTH_SERVICE,
  USER_SERVICE,
  DRIVER_SERVICE,
  TRIP_SERVICE,
  LOCATION_SERVICE,
  PAYMENT_SERVICE,
  NOTIFICATION_SERVICE
} = require("./env");

module.exports = {
  authProxy: createProxyMiddleware({
    target: AUTH_SERVICE,
    changeOrigin: true,
    onProxyReq: fixRequestBody, // This re-broadcasts the body if it was parsed
    pathRewrite: { "^/auth": "/auth" }
  }),


  userProxy: createProxyMiddleware({
    target: USER_SERVICE,
    changeOrigin: true,
    onProxyReq: fixRequestBody, // This re-broadcasts the body if it was parsed
    pathRewrite: { "^/users": "/users" },
  }),

  driverProxy: createProxyMiddleware({
    target: DRIVER_SERVICE,
    changeOrigin: true,
    onProxyReq: fixRequestBody, // This re-broadcasts the body if it was parsed
    pathRewrite: { "^/drivers": "/drivers" },
  }),

  tripProxy: createProxyMiddleware({
    target: TRIP_SERVICE,
    changeOrigin: true,
    onProxyReq: fixRequestBody, // This re-broadcasts the body if it was parsed
    pathRewrite: { "^/trips": "/trips" },
  }),

  locationProxy: createProxyMiddleware({
    target: LOCATION_SERVICE,
    changeOrigin: true,
    onProxyReq: fixRequestBody, // This re-broadcasts the body if it was parsed
    pathRewrite: { "^/location": "/location" },
    logLevel: "debug"
  }),

  paymentProxy: createProxyMiddleware({
    target: PAYMENT_SERVICE,
    changeOrigin: true,
    onProxyReq: fixRequestBody, // This re-broadcasts the body if it was parsed
    pathRewrite: { "^/payments": "/payments" },
    logLevel: "debug"
  }),

  notificationProxy: createProxyMiddleware({
    target: NOTIFICATION_SERVICE,
    changeOrigin: true,
    onProxyReq: fixRequestBody, // This re-broadcasts the body if it was parsed
    pathRewrite: { "^/notifications": "/notifications" },
    logLevel: "debug"
  }),
};
