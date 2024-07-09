const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

router.post("/", orderController.createOrder);
router.post("/process", orderController.processOrder);
router.get("/", orderController.getOrderByUserId);
router.get("/all", orderController.getOrders);
router.get("/:id", orderController.getOrderById);
router.put("/:id/status", orderController.updateOrderStatus);
router.put("/:id/payment", orderController.updatePaymentStatus);
router.delete("/:id", orderController.deleteOrder);

router.post("/create-and-process-order", orderController.createAndProcessOrder);

module.exports = router;
