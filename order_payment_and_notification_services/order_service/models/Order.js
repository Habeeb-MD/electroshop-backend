const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "completed"),
      allowNull: false,
    },
    shipping_address: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    payment_details: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "orders",
    underscored: true,
  },
);

module.exports = Order;
