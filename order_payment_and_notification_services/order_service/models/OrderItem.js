const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "order_item",
    underscored: true,
    timestamps: false,
  },
);

module.exports = OrderItem;
