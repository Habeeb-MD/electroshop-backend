module.exports = {
  apps: [
    {
      name: "product_service",
      script: "npm --prefix product_service run start",
      env: {
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: process.env.PRODUCT_SERVICE_PORT || 3001,
      },
    },
    {
      name: "cart_service",
      script: "npm --prefix cart_service run start",
      env: {
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: process.env.CART_SERVICE_PORT || 3002,
      },
    },
  ],
};
