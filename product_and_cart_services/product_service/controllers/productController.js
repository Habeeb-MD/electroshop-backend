const productService = require("../services/productService");

const formatProduct = (product) => {
  const formattedProduct = product.toJSON();
  if (product.ProductType) {
    formattedProduct.product_type = product.ProductType.name;
    delete formattedProduct.ProductType;
    delete formattedProduct.product_type_id;
  }
  if (product.Brand) {
    formattedProduct.brand = product.Brand.name;
    delete formattedProduct.Brand;
    delete formattedProduct.brand_id;
  }
  return formattedProduct;
};

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(formatProduct(product));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products.map(formatProduct));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (product) {
      res.status(200).json(formatProduct(product));
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(formatProduct(product));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateInventory = async (req, res) => {
  try {
    const product = await productService.updateInventory(
      req.params.id,
      req.body.update_quantity,
    );
    if (product) {
      res.status(200).json(formatProduct(product));
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateInventory,
};
