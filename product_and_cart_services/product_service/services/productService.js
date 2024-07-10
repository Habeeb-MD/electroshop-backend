const { Product, Brand, ProductType } = require("../models");
const redisClient = require("../config/redis");

const CACHE_TTL = 3600; // Cache time-to-live in seconds
const PRODUCT_PREFIX = "product:";

const createProduct = async (productData) => {
  const product = await Product.create(productData);
  // Invalidate products cache
  await redisClient.del(`${PRODUCT_PREFIX}all`);
  return product;
};

const getProducts = async () => {
  // Try to get products from cache
  const cachedProducts = await redisClient.get(`${PRODUCT_PREFIX}all`);
  if (cachedProducts) {
    return JSON.parse(cachedProducts);
  }

  // If not in cache, get from database
  const products = await Product.findAll({
    include: [
      { model: Brand, attributes: ["name"] },
      { model: ProductType, attributes: ["name"] },
    ],
  });

  // Store in cache
  await redisClient.set(`${PRODUCT_PREFIX}all`, JSON.stringify(products), {
    EX: CACHE_TTL,
  });

  return products;
};

const getProductById = async (id) => {
  // Try to get product from cache
  const cachedProduct = await redisClient.get(`${PRODUCT_PREFIX}${id}`);
  if (cachedProduct) {
    return JSON.parse(cachedProduct);
  }

  // If not in cache, get from database
  const product = await Product.findByPk(id, {
    include: [
      { model: Brand, attributes: ["name"] },
      { model: ProductType, attributes: ["name"] },
    ],
  });

  if (product) {
    // Store in cache
    await redisClient.set(`${PRODUCT_PREFIX}${id}`, JSON.stringify(product), {
      EX: CACHE_TTL,
    });
  }

  return product;
};

const updateProduct = async (id, productData) => {
  await Product.update(productData, {
    where: { prod_id: id },
  });
  // Invalidate cache for this product and all products
  await redisClient.del(`${PRODUCT_PREFIX}${id}`);
  await redisClient.del(`${PRODUCT_PREFIX}all`);
  return getProductById(id); // Fetch updated product
};

const deleteProduct = async (id) => {
  const result = await Product.destroy({
    where: { id },
  });
  // Invalidate cache for this product and all products
  await redisClient.del(`${PRODUCT_PREFIX}${id}`);
  await redisClient.del(`${PRODUCT_PREFIX}all`);
  return result;
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
    // Invalidate cache for this product and all products
    await redisClient.del(`${PRODUCT_PREFIX}${id}`);
    await redisClient.del(`${PRODUCT_PREFIX}all`);
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
