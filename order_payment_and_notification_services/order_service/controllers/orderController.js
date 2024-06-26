const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
  try {
    const { user_id, items } = req.body;
    const order = await orderService.createOrder(user_id, items);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status,
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const order = await orderService.updatePaymentStatus(
      req.params.id,
      req.body.paymentStatus,
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const rowsDeleted = await orderService.deleteOrder(req.params.id);
    if (rowsDeleted) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
};
