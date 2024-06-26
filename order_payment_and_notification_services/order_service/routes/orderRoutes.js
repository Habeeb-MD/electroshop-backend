const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrderById);
router.put("/:id/status", orderController.updateOrderStatus);
router.put("/:id/payment", orderController.updatePaymentStatus);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
