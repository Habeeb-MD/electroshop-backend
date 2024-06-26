const sequelize = require("../config/db");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// Define associations
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

module.exports = {
  sequelize,
  Order,
  OrderItem,
};
