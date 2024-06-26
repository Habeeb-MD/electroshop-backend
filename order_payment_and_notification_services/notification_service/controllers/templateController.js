const templateService = require("../services/templateService");
const catchAsync = require("../utils/catchAsync");
const createTemplate = catchAsync(async (req, res) => {
  const { name, type, content } = req.body;
  const template = await templateService.createTemplate(name, type, content);
  res.status(201).json(template);
});

const getTemplates = catchAsync(async (req, res) => {
  const templates = await templateService.getTemplates();
  res.status(200).json(templates);
});

const getTemplateById = catchAsync(async (req, res) => {
  const { templateId } = req.params;
  const template = await templateService.getTemplateById(templateId);
  if (!template) {
    return res.status(404).send("Template not found");
  }
  res.status(200).json(template);
});

const updateTemplate = catchAsync(async (req, res) => {
  const { templateId } = req.params;
  const updates = req.body;

  const [updated] = await templateService.updateTemplate(templateId, updates);
  if (!updated) {
    return res.status(404).send("Template not found");
  }
  res.status(200).send("Template updated");
});

const deleteTemplate = catchAsync(async (req, res) => {
  const { templateId } = req.params;
  const deleted = await templateService.deleteTemplate(templateId);
  if (!deleted) {
    return res.status(404).send("Template not found");
  }
  res.status(200).send("Template deleted");
});

module.exports = {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
};
