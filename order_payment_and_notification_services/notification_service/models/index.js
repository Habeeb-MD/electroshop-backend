const sequelize = require("../config/db");
const Notification = require("./Notification");
const Template = require("./Template");

module.exports = {
  sequelize,
  Notification,
  Template,
};
