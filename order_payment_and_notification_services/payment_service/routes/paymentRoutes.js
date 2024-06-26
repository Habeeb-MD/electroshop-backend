const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router
  .route("/")
  .get(paymentController.getTransactions)
  .post(paymentController.createTransaction);

router.get("/:id", paymentController.getTransactionById);
router.post("/:id/process", paymentController.processTransaction);

module.exports = router;
