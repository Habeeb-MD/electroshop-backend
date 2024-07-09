const { Order, OrderItem } = require("../models");
const {
  fetchProductDetails,
  createAndProcessTransaction,
} = require("../utils/utils");

const createOrder = async (userId, items, shippingAddress) => {
  let totalAmount = 0;

  const orderItems = await Promise.all(
    items.map(async (item) => {
      const product = await fetchProductDetails(item.id);

      if (!product) {
        throw new Error(`Product with ID ${item.id} not found`);
      }
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      return {
        productId: product.id,
        productName: product.name,
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
    shipping_address: shippingAddress,
  };
  const order = await Order.create(orderData);

  //these are async request, but we don't have to wait for them to finish, since they are not return value
  orderItems.map((item) => {
    return OrderItem.create({
      order_id: order.id,
      product_id: item.productId,
      product_name: item.productName,
      quantity: item.quantity,
      price: item.price,
    });
  });

  return order;
};

const processOrder = async (orderId, amount, paymentGateway, paymentMethod) => {
  const paymentResult = await createAndProcessTransaction(
    orderId,
    amount,
    paymentGateway,
    paymentMethod,
  );
  await updateOrder(orderId, {
    status: "completed",
    payment_details: {
      cardName: paymentMethod.cardName,
      cardNumber: paymentMethod.cardNumber,
    },
  });
  return paymentResult;
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

const getOrderByUserId = async (userId) => {
  return await Order.findAll({
    where: { user_id: userId },
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

const updateOrder = async (id, updatedKeyValue = {}) => {
  await Order.update(updatedKeyValue, { where: { id } });
  return await getOrderById(id);
};

const updateOrderStatus = async (id, status) => {
  return await updateOrder(id, { status });
};

const deleteOrder = async (id) => {
  return await Order.destroy({ where: { id } });
};

module.exports = {
  createOrder,
  getOrders,
  getOrderByUserId,
  getOrderById,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
  processOrder,
};
