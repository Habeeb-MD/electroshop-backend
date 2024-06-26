const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Template = sequelize.define(
  "Template",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING, // 'email' or 'sms'
      allowNull: false,
      defaultValue: "email", // for now, use email;
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "template",
    timestamps: true,
    underscored: true,
  },
);

module.exports = Template;
