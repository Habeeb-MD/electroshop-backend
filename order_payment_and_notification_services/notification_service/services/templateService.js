const { Template } = require("../models");

const createTemplate = async (name, type, content) => {
  return await Template.create({ name, type, content });
};

const getTemplates = async () => {
  return await Template.findAll();
};

const getTemplateById = async (templateId) => {
  return await Template.findByPk(templateId);
};

const updateTemplate = async (templateId, updates) => {
  return await Template.update(updates, { where: { id: templateId } });
};

const deleteTemplate = async (templateId) => {
  return await Template.destroy({ where: { id: templateId } });
};

module.exports = {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
};
