const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/:id")
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

router.patch("/:id/inventory", productController.updateInventory);

module.exports = router;
