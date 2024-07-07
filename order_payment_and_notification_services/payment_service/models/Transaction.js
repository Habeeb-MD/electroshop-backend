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
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "orders", // name of the target model
        key: "id", // key in the target model that we're referencing
      },
      onDelete: "CASCADE",
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "initiated", "approved", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },
    payment_gateway: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_details: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    underscored: true,
  },
);

module.exports = Transaction;
