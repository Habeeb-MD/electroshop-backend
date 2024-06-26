const brandService = require("../services/brandService");

const createBrand = async (req, res) => {
  try {
    const brand = await brandService.createBrand(req.body);
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBrands = async (req, res) => {
  try {
    const brands = await brandService.getBrands();
    res.status(200).json(brands);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getBrandById = async (req, res) => {
  try {
    const brand = await brandService.getBrandById(req.params.id);
    if (brand) {
      res.status(200).json(brand);
    } else {
      res.status(404).json({ error: "Brand not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBrand = async (req, res) => {
  try {
    const brand = await brandService.updateBrand(req.params.id, req.body);
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBrand = async (req, res) => {
  try {
    await brandService.deleteBrand(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
