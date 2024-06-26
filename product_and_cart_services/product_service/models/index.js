const sequelize = require("../config/db");
const Brand = require("./Brand");
const ProductType = require("./ProductType");
const Product = require("./Product");

// Define associations
Brand.hasMany(Product, { foreignKey: "brand_id" });
Product.belongsTo(Brand, { foreignKey: "brand_id" });

Product.belongsTo(ProductType, { foreignKey: "product_type_id" });

module.exports = {
  sequelize,
  Product,
  Brand,
  ProductType,
};
