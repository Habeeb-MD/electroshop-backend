const orderService = require("../services/orderService");
const catchAsync = require("../utils/catchAsync");
const { sendNotifications } = require("../utils/utils");

const createOrder = catchAsync(async (req, res) => {
  const { items, shippingAddress } = req.body;
  const userId = req.user._id;
  const order = await orderService.createOrder(userId, items, shippingAddress);
  res.status(201).json(order);
});

const processOrder = catchAsync(async (req, res) => {
  const { orderId, amount, paymentGateway, paymentMethod } = req.body;
  const paymentResult = await orderService.processOrder(
    orderId,
    amount,
    paymentGateway,
    paymentMethod,
  );
  res.status(200).json(paymentResult);
});

const getOrders = catchAsync(async (req, res) => {
  const orders = await orderService.getOrders();
  res.status(200).json(orders);
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderStatus(
    req.params.id,
    req.body.status,
  );
  res.status(200).json(order);
});

const updatePaymentStatus = catchAsync(async (req, res) => {
  const order = await orderService.updatePaymentStatus(
    req.params.id,
    req.body.paymentStatus,
  );
  res.status(200).json(order);
});

const deleteOrder = catchAsync(async (req, res) => {
  const rowsDeleted = await orderService.deleteOrder(req.params.id);
  if (rowsDeleted) {
    res.status(200).json({ message: "Order deleted successfully" });
  } else {
    res.status(404).json({ error: "Order not found" });
  }
});

const createAndProcessOrder = catchAsync(async (req, res) => {
  const { items, shippingAddress, paymentGateway, paymentMethod } = req.body;

  const userId = req.user._id;
  const userEmail = req.user.email;

  const order = await orderService.createOrder(userId, items, shippingAddress);

  const paymentResult = await orderService.processOrder(
    order.id,
    order.total_amount,
    paymentGateway,
    paymentMethod,
  );

  // Notify the Notification Service
  const result = {
    status: paymentResult.status,
    orderId: order.id,
    ...paymentResult.gatewayResponse,
  };

  res.status(200).json(result);

  await sendNotifications(userId, userEmail, result);
});
module.exports = {
  createOrder,
  processOrder,
  createAndProcessOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
};
