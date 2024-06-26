const { Brand } = require("../models");

const createBrand = async (brandData) => {
  return await Brand.create(brandData);
};

const getBrands = async () => {
  return await Brand.findAll();
};

const getBrandById = async (id) => {
  return await Brand.findByPk(id);
};

const updateBrand = async (id, brandData) => {
  return await Brand.update(brandData, {
    where: { brand_id: id },
  });
};

const deleteBrand = async (id) => {
  return await Brand.destroy({
    where: { brand_id: id },
  });
};

module.exports = {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
