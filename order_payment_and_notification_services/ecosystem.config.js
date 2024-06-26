module.exports = {
  apps: [
    {
      name: 'order_service',
      script: "npm --prefix order_service run start:prod",
      env: {
        PORT: 3003,
      },
    },
    {
      name: 'payment_service',
      script: "npm --prefix payment_service run start:prod",
      env: {
        PORT: 3004,
      },
    },
    {
      name: 'notification_service',
      script: "npm --prefix notification_service run start:prod",
      env: {
        PORT: 3005,
      },
    },
  ],
};
