module.exports = {
  apps: [
    {
      name: "order_service",
      script: "npm --prefix order_service run start",
      env: {
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: process.env.ORDER_SERVICE_PORT || 3003,
      },
    },
    {
      name: "payment_service",
      script: "npm --prefix payment_service run start",
      env: {
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: process.env.PAYMENT_SERVICE_PORT || 3004,
      },
    },
    {
      name: "notification_service",
      script: "npm --prefix notification_service run start",
      env: {
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: process.env.NOTIFICATION_SERVICE_PORT || 3005,
      },
    },
  ],
};
