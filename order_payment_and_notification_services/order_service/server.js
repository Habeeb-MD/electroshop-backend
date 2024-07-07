require("dotenv").config({ path: ".env" });
const { sequelize } = require("./models");
const app = require("./app");

const PORT = process.env.PORT || 3003;

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Order service is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
