module.exports = {
  apps: [
    {
      name: 'product_service',
      script: 'npm --prefix product_service run start:prod',
      env: {
        PORT: 3001,
      },
    },
    {
      name: 'cart_service',
      script: 'npm --prefix cart_service run start:prod',
      env: {
        PORT: 3002,
      },
    },
  ],
};
