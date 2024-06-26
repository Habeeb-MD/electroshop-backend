require("dotenv").config({ path: ".env" });
const { sequelize } = require("./models");
const app = require("./app");
const { initializeRabbitMQ } = require("./config/rabbitMQ");
const { consumeNotifications } = require("./services/notificationService");

const PORT = process.env.PORT || 3005;

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Notification service is running on port ${PORT}`);
      await initializeRabbitMQ();
      await consumeNotifications();
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
