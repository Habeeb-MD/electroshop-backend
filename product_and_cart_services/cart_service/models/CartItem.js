const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const CartItem = sequelize.define(
  "CartItem",
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
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "cart_item",
    timestamps: true,
    underscored: true,
  },
);

module.exports = CartItem;
