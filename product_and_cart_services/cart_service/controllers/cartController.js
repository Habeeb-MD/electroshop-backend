const cartService = require("../services/cartService");
const catchAsync = require("../utils/catchAsync");

const addToCart = catchAsync(async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const cart = await cartService.addToCart(user_id, product_id, quantity);
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const updateCartItem = catchAsync(async (req, res) => {
  try {
    const { user_id, product_id, quantity } = req.body;
    const cart = await cartService.updateCartItem(
      user_id,
      product_id,
      quantity,
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const removeFromCart = catchAsync(async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    const cart = await cartService.removeFromCart(user_id, product_id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getCart = catchAsync(async (req, res) => {
  const { user_id } = req.params;
  const cart = await cartService.getCart(user_id);
  res.status(200).json(cart);
});

const clearCart = catchAsync(async (req, res) => {
  try {
    const { user_id } = req.body;
    const cart = await cartService.clearCart(user_id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = {
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
  clearCart,
};
