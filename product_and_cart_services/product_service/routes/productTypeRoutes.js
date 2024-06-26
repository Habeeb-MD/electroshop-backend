const express = require("express");
const productTypeController = require("../controllers/productTypeController");

const router = express.Router();

router.post("/", productTypeController.createProductType);
router.get("/", productTypeController.getProductTypes);
router.get("/:id", productTypeController.getProductTypeById);
router.put("/:id", productTypeController.updateProductType);
router.delete("/:id", productTypeController.deleteProductType);

module.exports = router;
