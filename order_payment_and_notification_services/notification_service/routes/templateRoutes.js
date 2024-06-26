const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");

router
  .route("/")
  .post(templateController.createTemplate)
  .get(templateController.getTemplates);

router
  .route("/:templateId")
  .get(templateController.getTemplateById)
  .put(templateController.updateTemplate)
  .delete(templateController.deleteTemplate);

module.exports = router;
