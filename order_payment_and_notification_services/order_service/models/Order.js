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
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "order",
    underscored: true,
    timestamps: false,
  },
);

module.exports = Order;
