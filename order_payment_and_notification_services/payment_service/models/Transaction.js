const sequelize = require("../config/db");
const { DataTypes, Sequelize } = require("sequelize");

const Transaction = sequelize.define(
  "Transaction",
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
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    payment_gateway: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_details: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
  },
);

module.exports = Transaction;
