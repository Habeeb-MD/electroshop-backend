const { Product, Brand, ProductType } = require("../models");

const createProduct = async (productData) => {
  return await Product.create(productData);
};

const getProducts = async () => {
  return await Product.findAll({
    include: [
      { model: Brand, attributes: ["name"] },
      { model: ProductType, attributes: ["name"] },
    ],
  });
};

const getProductById = async (id) => {
  return await Product.findByPk(id, {
    include: [
      { model: Brand, attributes: ["name"] },
      { model: ProductType, attributes: ["name"] },
    ],
  });
};

const updateProduct = async (id, productData) => {
  await Product.update(productData, {
    where: { prod_id: id },
  });
  return getProductById(id); // Fetch updated product
};

const deleteProduct = async (id) => {
  return await Product.destroy({
    where: { id },
  });
};

const updateInventory = async (id, quantity) => {
  const product = await Product.findByPk(id);
  if (product) {
    product.inventory -= Object.hasOwn(quantity, "decrease")
      ? quantity["decrease"]
      : 0;
    product.inventory += Object.hasOwn(quantity, "increase")
      ? quantity["increase"]
      : 0;
    await product.save();
  }
  return getProductById(id); // Fetch updated product
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateInventory,
};
