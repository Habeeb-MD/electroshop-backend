const productTypeService = require("../services/productTypeService");

const createProductType = async (req, res) => {
  try {
    const productType = await productTypeService.createProductType(req.body);
    res.status(201).json(productType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductTypes = async (req, res) => {
  try {
    const productTypes = await productTypeService.getProductTypes();
    res.status(200).json(productTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductTypeById = async (req, res) => {
  try {
    const productType = await productTypeService.getProductTypeById(
      req.params.id,
    );
    if (productType) {
      res.status(200).json(productType);
    } else {
      res.status(404).json({ error: "Product type not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProductType = async (req, res) => {
  try {
    const productType = await productTypeService.updateProductType(
      req.params.id,
      req.body,
    );
    res.status(200).json(productType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductType = async (req, res) => {
  try {
    await productTypeService.deleteProductType(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProductType,
  getProductTypes,
  getProductTypeById,
  updateProductType,
  deleteProductType,
};
