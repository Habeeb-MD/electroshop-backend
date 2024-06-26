const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/db");

const ProductType = sequelize.define(
  "ProductType",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.ENUM,
      values: ["Laptop", "Smartphone", "Tablet", "Accessory"],
      allowNull: false,
    },
  },
  {
    underscored: true,
    timestamps: false,
    tableName: "product_type",
  },
);

module.exports = ProductType;
