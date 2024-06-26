const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const Notification = sequelize.define(
  "Notification",
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
    type: {
      type: DataTypes.STRING, // 'email' or 'sms'
      allowNull: false,
      defaultValue: "email", // for now, use email only;
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending", // 'pending', 'sent', 'failed'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "notification",
    underscored: true,
    timestamps: true,
  },
);

module.exports = Notification;
