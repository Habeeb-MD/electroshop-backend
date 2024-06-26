const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const Brand = sequelize.define(
  "Brand",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "brand",
    underscored: true,
  },
);

module.exports = Brand;
