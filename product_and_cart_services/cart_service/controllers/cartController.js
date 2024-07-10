const cartService = require("../services/cartService");
const catchAsync = require("../utils/catchAsync");

const addToCart = catchAsync(async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const cart = await cartService.addToCart(
      req.user._id,
      product_id,
      quantity,
    );
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const updateCartItem = catchAsync(async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const cart = await cartService.updateCartItem(
      req.user._id,
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
    const { product_id } = req.body;
    const cart = await cartService.removeFromCart(req.user._id, product_id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getCart = catchAsync(async (req, res) => {
  const cart = await cartService.getCart(req.user._id);
  res.status(200).json(cart);
});

const clearCart = catchAsync(async (req, res) => {
  try {
    const cart = await cartService.clearCart(req.user._id);
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
