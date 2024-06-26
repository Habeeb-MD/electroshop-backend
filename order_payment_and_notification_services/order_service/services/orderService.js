const { Order, OrderItem } = require("../models");
const { fetchProductDetails } = require("../utils/utils");

const createOrder = async (userId, items) => {
  let totalAmount = 0;

  const orderItems = await Promise.all(
    items.map(async (item) => {
      const product = await fetchProductDetails(item.product_id);

      if (!product) {
        throw new Error(`Product with ID ${item.product_id} not found`);
      }
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      return {
        product_id: item.product_id,
        quantity: item.quantity,
        price: product.price,
        itemTotal,
      };
    }),
  );

  const orderData = {
    user_id: userId,
    total_amount: totalAmount,
    status: "pending",
    payment_status: "unpaid",
  };
  const order = await Order.create(orderData);

  await Promise.all(
    orderItems.map((item) => {
      return OrderItem.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      });
    }),
  );

  return { order, orderItems };
};

const getOrders = async () => {
  return await Order.findAll({
    include: [
      {
        model: OrderItem,
        // Removed Product association, no direct connection needed
      },
    ],
  });
};

const getOrderById = async (id) => {
  return await Order.findByPk(id, {
    include: [
      { model: OrderItem, attributes: { exclude: ["id", "order_id"] } },
    ],
    attributes: {
      exclude: ["user_id"],
    },
  });
};

const updateOrderStatus = async (id, status) => {
  await Order.update({ status }, { where: { order_id: id } });
  return await getOrderById(id);
};

const updatePaymentStatus = async (id, paymentStatus) => {
  await Order.update(
    { payment_status: paymentStatus },
    { where: { order_id: id } },
  );
  return await getOrderById(id);
};

const deleteOrder = async (id) => {
  return await Order.destroy({ where: { id } });
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder,
};
